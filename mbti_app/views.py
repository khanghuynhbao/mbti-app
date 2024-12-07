from django.shortcuts import render, redirect # type: ignore
from django.http import Http404 # type: ignore
from .data.personality_data import PERSONALITY_TYPES
from .data.careers_data import CAREERS_DATA
import json

# Trang "Trắc nghiệm tính cách MBTI"
def trac_nghiem_tinh_cach_mbti(request):
    return render(request, 'mbti_app/trac-nghiem-tinh-cach-mbti.html')

# Trang "Làm kiểm tra"
def lam_kiem_tra(request):
    with open('mbti_app/data/questions.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    if request.method == 'POST':
        # Định nghĩa mapping câu hỏi cho từng chiều
        dimension_questions = {
            'EI': {'E': [1, 8, 15, 22, 29, 36, 43, 50, 57, 64]},
            'SN': {'S': [3, 10, 17, 24, 31, 38, 45, 52, 59, 66]},
            'TF': {'T': [5, 12, 19, 26, 33, 40, 47, 54, 61, 68]},
            'JP': {'J': [7, 14, 21, 28, 35, 42, 49, 56, 63, 70]}
        }

        responses = {}
        for q in questions:
            q_id = f"q{q['id']}"
            response = request.POST.get(q_id)
            if response is None:
                return render(request, 'mbti_app/lam-kiem-tra.html', {
                    'questions': questions,
                    'error': 'Vui lòng trả lời tất cả các câu hỏi'
                })
            responses[q_id] = int(response)

        # Khởi tạo điểm cho từng chiều
        scores = {
            'E': 0, 'I': 0,
            'S': 0, 'N': 0,
            'T': 0, 'F': 0,
            'J': 0, 'P': 0
        }

        # Tính điểm cho từng câu trả lời
        for dim, maps in dimension_questions.items():
            primary_type = list(maps.keys())[0]  # E, S, T, hoặc J
            for q_num in maps[primary_type]:
                response = responses[f"q{q_num}"]
                if response == 0:  # Nếu chọn lựa chọn đầu tiên
                    scores[primary_type] += 1
                else:  # Nếu chọn lựa chọn thứ hai
                    scores[opposite_letter(primary_type)] += 1

        # Tính phần trăm cho mỗi chiều
        dimension_scores = {}
        dimension_pairs = [('E', 'I'), ('S', 'N'), ('T', 'F'), ('J', 'P')]
        for dim1, dim2 in dimension_pairs:
            total = scores[dim1] + scores[dim2]
            percentage = (scores[dim1] / total * 100) if total > 0 else 50
            dimension_scores[f'{dim1.lower()}{dim2.lower()}_score'] = percentage

        # Determine personality type
        personality_type = ''
        personality_type += 'E' if dimension_scores['ei_score'] >= 50 else 'I'
        personality_type += 'S' if dimension_scores['sn_score'] >= 50 else 'N'
        personality_type += 'T' if dimension_scores['tf_score'] >= 50 else 'F'
        personality_type += 'J' if dimension_scores['jp_score'] >= 50 else 'P'

        # Store results
        result = {
            'personality_type': personality_type,
            'personality_name': PERSONALITY_TYPES[personality_type]['name'],
            'description': PERSONALITY_TYPES[personality_type],
            **dimension_scores
        }
        
        request.session['mbti_result'] = result
        return redirect('ket_qua')

    return render(request, 'mbti_app/lam-kiem-tra.html', {
        'questions': questions
    })

def opposite_letter(letter):
    opposites = {'E': 'I', 'I': 'E', 'S': 'N', 'N': 'S', 
                 'T': 'F', 'F': 'T', 'J': 'P', 'P': 'J'}
    return opposites[letter]

# Dynamic result page for each personality type
def ket_qua(request, mbti_type=None):
    if mbti_type is None:
        result = request.session.get('mbti_result')
        if not result:
            return redirect('lam_kiem_tra')
        mbti_type = result['personality_type']
        return redirect('ket_qua', mbti_type=mbti_type)
    else:
        mbti_type = mbti_type.upper()
        if mbti_type not in PERSONALITY_TYPES:
            raise Http404("Không tìm thấy loại tính cách này")
        result = request.session.get('mbti_result', {
            'ei_score': 50,  # Default values or fetch from another source
            'sn_score': 50,
            'tf_score': 50,
            'jp_score': 50
        })
    
    personality = PERSONALITY_TYPES[mbti_type]
    context = {
        'personality': personality,
        'personality_type': mbti_type,
        'personality_name': personality.get('name', ''),
        'description': personality.get('description', ''),
        'ei_score': result['ei_score'],
        'sn_score': result['sn_score'],
        'tf_score': result['tf_score'],
        'jp_score': result['jp_score'],
        'types': PERSONALITY_TYPES
    }
    return render(request, 'mbti_app/ket-qua.html', context)

# Trang "Hướng nghiệp"
def tra_cuu(request):
    # Lấy danh sách careers đã được sắp xếp theo nhóm
    careers_by_field = {}
    for career in CAREERS_DATA:
        field = career['field']
        if field not in careers_by_field:
            careers_by_field[field] = []
        careers_by_field[field].append(career)
    
    return render(request, 'mbti_app/tra-cuu.html', {
        'careers': CAREERS_DATA,
        'careers_by_field': careers_by_field,
        'PERSONALITY_TYPES': PERSONALITY_TYPES
    })

# View hiển thị danh sách 16 loại tính cách
def cac_loai_tinh_cach(request):
    return render(request, 'mbti_app/cac-loai-tinh-cach.html', {'types': PERSONALITY_TYPES})

# View hiển thị chi tiết từng loại tính cách
def tinh_cach(request, mbti_type):
    # Lấy mbti_type từ URL và chuyển thành chữ hoa
    mbti_type = mbti_type.upper()
    
    # Kiểm tra tính hợp lệ của mbti_type
    if mbti_type not in PERSONALITY_TYPES:
        raise Http404("Không tìm thấy loại tính cách này")
    
    try:
        # Lấy thông tin tính cách
        personality = PERSONALITY_TYPES[mbti_type]
        
        # Sắp xếp danh sách tính cách theo nhóm
        all_personalities = []
        for p_type, p_data in PERSONALITY_TYPES.items():
            if p_type != mbti_type:  # Loại bỏ tính cách hiện tại
                personality_info = {
                    'key': p_type,
                    'name': p_data['name'],
                }
                all_personalities.append(personality_info)
        
        context = {
            'personality': personality,
            'all_personalities': all_personalities
        }
        
        return render(request, 'mbti_app/tinh-cach.html', context)
    
    except KeyError:
        raise Http404(f"Lỗi khi lấy dữ liệu cho tính cách {mbti_type}")

# Trang "Các thống kê"
def thong_ke(request):
    return render(request, 'mbti_app/thong-ke.html')