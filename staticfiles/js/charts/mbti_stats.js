document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("mbtiFieldChart").getContext("2d");

  const data = {
    labels: [
      "ISTJ",
      "ISFJ",
      "INFJ",
      "INTJ",
      "ISTP",
      "ISFP",
      "INFP",
      "INTP",
      "ESTP",
      "ESFP",
      "ENFP",
      "ENTP",
      "ESTJ",
      "ESFJ",
      "ENFJ",
      "ENTJ",
    ],
    datasets: [
      {
        label: "Giáo dục",
        backgroundColor: "#CE6F80",
        data: [1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1],
      },
      {
        label: "Kỹ thuật & Công nghệ",
        backgroundColor: "#36A2EB",
        data: [2, 0, 1, 3, 3, 0, 0, 3, 3, 0, 0, 3, 2, 0, 1, 3],
      },
      {
        label: "CNTT & Truyền thông",
        backgroundColor: "#FFCE56",
        data: [0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 1, 2, 0, 0, 0, 2],
      },
      {
        label: "Kinh doanh & Luật",
        backgroundColor: "#FF9F40",
        data: [2, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 2],
      },
      {
        label: "Nông nghiệp & Môi trường",
        backgroundColor: "#8AC249",
        data: [3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3],
      },
      {
        label: "Khoa học tự nhiên",
        backgroundColor: "#FF6384",
        data: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      },
      {
        label: "Nhân văn & Du lịch",
        backgroundColor: "#9966FF",
        data: [0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Phân bố ngành học theo 16 loại tính cách MBTI",
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: "Số lượng ngành",
          },
        },
      },
    },
  };

  new Chart(ctx, config);
});
