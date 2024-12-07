# 1. Imports
from .personalities.intj import INTJ_DATA
from .personalities.intp import INTP_DATA
from .personalities.entj import ENTJ_DATA
from .personalities.entp import ENTP_DATA
from .personalities.infj import INFJ_DATA 
from .personalities.infp import INFP_DATA
from .personalities.enfj import ENFJ_DATA
from .personalities.enfp import ENFP_DATA
from .personalities.istj import ISTJ_DATA
from .personalities.isfj import ISFJ_DATA
from .personalities.estj import ESTJ_DATA
from .personalities.esfj import ESFJ_DATA
from .personalities.istp import ISTP_DATA
from .personalities.isfp import ISFP_DATA
from .personalities.estp import ESTP_DATA
from .personalities.esfp import ESFP_DATA

# Core Constants
DIMENSIONS = {
    'EI': {
        'title': 'Hướng nội (I) - Hướng ngoại (E)',
        'E': {
            'description': 'Hướng ngoại (Extraversion): Bạn tập trung vào thế giới bên ngoài, nơi con người, sự kiện và trải nghiệm thực tế là trọng tâm của bạn.'
        },
        'I': {
            'description': 'Hướng nội (Introversion): Bạn chú trọng vào thế giới nội tâm, nơi suy nghĩ, cảm xúc và ý tưởng của bản thân trở thành trung tâm.'
        }
    },
    'SN': {
        'title': 'Giác quan (S) - Trực giác (N)',
        'S': {
            'description': 'Giác quan (Sensing): Bạn tập trung vào thực tế và những gì có thể quan sát trực tiếp qua năm giác quan.'
        },
        'N': {
            'description': 'Trực giác (Intuition): Bạn hướng đến ý nghĩa và khả năng của các sự vật, sự việc.'
        }
    },
    'TF': {
        'title': 'Lý trí (T) - Cảm xúc (F)',
        'T': {
            'description': 'Lý trí (Thinking): Bạn đưa ra quyết định dựa trên sự khách quan, logic và phân tích.'
        },
        'F': {
            'description': 'Cảm xúc (Feeling): Bạn đưa ra quyết định dựa trên cảm nhận cá nhân và các giá trị cốt lõi.'
        }
    },
    'JP': {
        'title': 'Nguyên tắc (J) - Linh hoạt (P)',
        'J': {
            'description': 'Nguyên tắc (Judging): Bạn thích sự rõ ràng, cấu trúc và tổ chức.'
        },
        'P': {
            'description': 'Linh hoạt (Perceiving): Bạn thích sự linh hoạt, tự do và khả năng thích nghi.'
        }
    }
}

# Helper Functions
def process_personality_data(data):
    """Xử lý và chuẩn hóa dữ liệu tính cách"""
    processed = {**data}  # Copy data gốc
    
    # Tách strengths và weaknesses từ strengths_weaknesses
    if 'strengths_weaknesses' in data:
        processed['strengths'] = data['strengths_weaknesses'].get('strengths', [])
        processed['weaknesses'] = data['strengths_weaknesses'].get('weaknesses', [])
    
    # Lấy careers từ career_path
    if 'career_path' in data:
        processed['careers'] = data['career_path'].get('suitable_fields', [])
    
    # Thêm dimension_details
    type_chars = list(data['key'])
    processed['dimension_details'] = {
        'EI': {
            'title': DIMENSIONS['EI']['title'],
            'code': type_chars[0],
            'detail': DIMENSIONS['EI'][type_chars[0]]['description']
        },
        'SN': {
            'title': DIMENSIONS['SN']['title'],
            'code': type_chars[1],
            'detail': DIMENSIONS['SN'][type_chars[1]]['description']
        },
        'TF': {
            'title': DIMENSIONS['TF']['title'],
            'code': type_chars[2],
            'detail': DIMENSIONS['TF'][type_chars[2]]['description']
        },
        'JP': {
            'title': DIMENSIONS['JP']['title'],
            'code': type_chars[3],
            'detail': DIMENSIONS['JP'][type_chars[3]]['description']
        }
    }
    
    return processed

# Data Processing
PERSONALITY_TYPES = {
    mbti: process_personality_data(data)
    for mbti, data in {
        "INTJ": INTJ_DATA,
        "INTP": INTP_DATA,
        "ENTJ": ENTJ_DATA,
        "ENTP": ENTP_DATA,
        "INFJ": INFJ_DATA,
        "INFP": INFP_DATA,
        "ENFJ": ENFJ_DATA,
        "ENFP": ENFP_DATA,
        "ISTJ": ISTJ_DATA,
        "ISFJ": ISFJ_DATA,
        "ESTJ": ESTJ_DATA,
        "ESFJ": ESFJ_DATA,
        "ISTP": ISTP_DATA,
        "ISFP": ISFP_DATA,
        "ESTP": ESTP_DATA,
        "ESFP": ESFP_DATA
    }.items()
}