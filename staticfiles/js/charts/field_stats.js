const fieldColors = {
  education: "#CE6F80",
  engineering: "#36A2EB",
  it: "#FFCE56",
  business: "#FF9F40",
  agriculture: "#8AC249",
  science: "#FF6384",
  humanities: "#9966FF",
};

// Shared configuration for all charts
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
      legend: {
        position: "top",
      },
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

// Initialize individual field charts with matching colors
document.addEventListener("DOMContentLoaded", function () {
  new Chart(
    "educationChart",
    chartConfig(
      [1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1],
      "Phân bố ngành Giáo dục theo tính cách MBTI",
      fieldColors.education
    )
  );

  new Chart(
    "engineeringChart",
    chartConfig(
      [2, 0, 1, 3, 3, 0, 0, 3, 3, 0, 0, 3, 2, 0, 1, 3],
      "Phân bố ngành Kỹ thuật & Công nghệ theo tính cách MBTI",
      fieldColors.engineering
    )
  );

  new Chart(
    "itChart",
    chartConfig(
      [0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 1, 2, 0, 0, 0, 2],
      "Phân bố ngành CNTT & Truyền thông theo tính cách MBTI",
      fieldColors.it
    )
  );

  new Chart(
    "businessChart",
    chartConfig(
      [2, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 2],
      "Phân bố ngành Kinh doanh & Luật theo tính cách MBTI",
      fieldColors.business
    )
  );

  new Chart(
    "agricultureChart",
    chartConfig(
      [3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3],
      "Phân bố ngành Nông nghiệp & Môi trường theo tính cách MBTI",
      fieldColors.agriculture
    )
  );

  new Chart(
    "scienceChart",
    chartConfig(
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      "Phân bố ngành Khoa học tự nhiên theo tính cách MBTI",
      fieldColors.science
    )
  );

  new Chart(
    "humanitiesChart",
    chartConfig(
      [0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0],
      "Phân bố ngành Nhân văn & Du lịch theo tính cách MBTI",
      fieldColors.humanities
    )
  );

  // Handle field row clicks
  const fieldRows = document.querySelectorAll(".field-row");
  const fieldCharts = document.querySelectorAll(".field-chart");

  fieldRows.forEach((row) => {
    row.addEventListener("click", function () {
      const fieldName = this.dataset.field;

      // Hide all charts first
      fieldCharts.forEach((chart) => {
        chart.style.display = "none";
      });

      // Remove active class from all rows
      fieldRows.forEach((r) => {
        r.classList.remove("active");
      });

      // Show selected chart and highlight row
      const selectedChart = document.getElementById(`${fieldName}-chart`);
      if (selectedChart) {
        selectedChart.style.display = "block";
        this.classList.add("active");
      }
    });
  });

  // Show education chart by default
  document.querySelector('[data-field="education"]').click();
});
