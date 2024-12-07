// Overview Chart
document.addEventListener("DOMContentLoaded", function () {
  // Field Colors
  const fieldColors = {
    education: "#E57B8E",
    engineering: "#349EE5",
    it: "#E5B94D",
    business: "#E58F39",
    agriculture: "#A3E556",
    science: "#E55976",
    humanities: "#895BE5",
  };

  // Initialize Overview Chart
  function initOverviewChart() {
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
          backgroundColor: fieldColors.education,
          data: [1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1],
        },
        {
          label: "Kỹ thuật & Công nghệ",
          backgroundColor: fieldColors.engineering,
          data: [2, 0, 1, 3, 3, 0, 0, 3, 3, 0, 0, 3, 2, 0, 1, 3],
        },
        {
          label: "Công nghệ thông tin",
          backgroundColor: fieldColors.it,
          data: [0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 1, 2, 0, 0, 0, 2],
        },
        {
          label: "Kinh doanh",
          backgroundColor: fieldColors.business,
          data: [2, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 2],
        },
        {
          label: "Nông nghiệp",
          backgroundColor: fieldColors.agriculture,
          data: [3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3],
        },
        {
          label: "Khoa học",
          backgroundColor: fieldColors.science,
          data: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        },
        {
          label: "Nhân văn",
          backgroundColor: fieldColors.humanities,
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
          legend: { position: "top" },
          title: {
            display: true,
            text: "Phân bố ngành học theo 16 loại tính cách MBTI",
          },
        },
        scales: {
          x: { stacked: true },
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
  }

  // Initialize Field-specific Charts
  function initFieldCharts() {
    const chartConfig = (data, title, color) => ({
      type: "bar",
      data: {
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
            label: "Số ngành phù hợp",
            backgroundColor: color,
            data: data,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: title,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Số ngành",
            },
          },
        },
      },
    });

    // Initialize each field chart
    const fieldChartData = {
      education: [1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1],
      engineering: [2, 0, 1, 3, 3, 0, 0, 3, 3, 0, 0, 3, 2, 0, 1, 3],
      it: [0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 1, 2, 0, 0, 0, 2],
      business: [2, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 2],
      agriculture: [3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3],
      science: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      humanities: [0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    };

    Object.entries(fieldChartData).forEach(([field, data]) => {
      new Chart(
        `${field}Chart`,
        chartConfig(
          data,
          `Phân bố ngành ${field} theo tính cách MBTI`,
          fieldColors[field]
        )
      );
    });
  }

  // Handle Field Row Clicks
  function initFieldRowHandlers() {
    const fieldRows = document.querySelectorAll(".field-row");
    const fieldCharts = document.querySelectorAll(".field-chart");

    fieldRows.forEach((row) => {
      row.addEventListener("click", function () {
        // Ẩn tất cả các biểu đồ
        fieldCharts.forEach((chart) => (chart.style.display = "none"));
        // Xóa trạng thái active của tất cả các hàng
        fieldRows.forEach((r) => r.classList.remove("active"));

        // Lấy id nhóm ngành từ data attribute
        const fieldId = this.dataset.field;
        // Hiển thị biểu đồ tương ứng
        const selectedChart = document.getElementById(`${fieldId}-chart`);
        if (selectedChart) {
          selectedChart.style.display = "block";
          this.classList.add("active");
        }
      });
    });

    // Hiển thị biểu đồ đầu tiên mặc định
    const firstRow = document.querySelector(".field-row");
    if (firstRow) firstRow.click();
  }

  function initPersonalityChart() {
    const ctx = document.getElementById("personalityChart").getContext("2d");

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
          label: "Số ngành phù hợp",
          data: [10, 1, 1, 13, 4, 3, 5, 6, 3, 2, 2, 2, 10, 1, 7, 12],
          backgroundColor: [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FFA500",
            "#800080",
            "#FFC0CB",
            "#A52A2A",
            "#808080",
            "#00FFFF",
            "#008000",
            "#4682B4",
            "#D8BFD8",
            "#FF4500",
            "#FFD700",
            "#808000",
          ],
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Thêm dòng này để duy trì tỷ lệ khung hình
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 20,
              padding: 10,
              usePointStyle: true,
              pointStyle: "rectRounded",
              font: {
                size: 10,
              },
            },
          },
          title: {
            display: true,
            text: "Phân bố ngành học theo các nhóm tính cách MBTI",
          },
        },
      },
    };

    new Chart(ctx, config);
  }

  // Initialize Everything
  initOverviewChart();
  initFieldCharts();
  initFieldRowHandlers();
  initPersonalityChart();
});
