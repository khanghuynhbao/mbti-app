document.addEventListener("DOMContentLoaded", function () {
  const createDimensionChart = (
    elementId,
    score,
    label1,
    label2,
    color1,
    color2
  ) => {
    const ctx = document.getElementById(elementId).getContext("2d");
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [label1, label2],
        datasets: [
          {
            data: [score, 100 - score],
            backgroundColor: [color1, color2],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 12,
              },
              generateLabels: function (chart) {
                const data = chart.data;
                return data.labels.map((label, i) => ({
                  text: `${label}: ${data.datasets[0].data[i].toFixed(1)}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  index: i,
                }));
              },
            },
          },
        },
      },
    });
  };

  // Get scores from hidden spans
  const ei_score = parseFloat(document.getElementById("ei_score").textContent);
  const sn_score = parseFloat(document.getElementById("sn_score").textContent);
  const tf_score = parseFloat(document.getElementById("tf_score").textContent);
  const jp_score = parseFloat(document.getElementById("jp_score").textContent);

  // Create charts with the scores
  createDimensionChart(
    "eiChart",
    ei_score,
    "Hướng ngoại (E)",
    "Hướng nội (I)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 99, 132, 0.2)"
  );

  createDimensionChart(
    "snChart",
    sn_score,
    "Giác quan (S)",
    "Trực giác (N)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.2)"
  );

  createDimensionChart(
    "tfChart",
    tf_score,
    "Lý trí (T)",
    "Cảm xúc (F)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(75, 192, 192, 0.2)"
  );

  createDimensionChart(
    "jpChart",
    jp_score,
    "Nguyên tắc (J)",
    "Linh hoạt (P)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(153, 102, 255, 0.2)"
  );
});

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("Đã sao chép link kết quả!");
}
