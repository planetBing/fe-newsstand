export function subscribeGridPress() {
  const gridWrap = document.querySelector(".press-grid-wrap");
  gridWrap.addEventListener("click", (event) => {
    if (event.target.classList.contains("subs")) {
      event.stopPropagation();
      event.preventDefault();
      const pressBox = event.target.parentNode;
      const imgEl = pressBox.querySelector(".press-logo");
      const pressName = imgEl.getAttribute("alt");
      const brandMark = imgEl.getAttribute("src");

      fetch("http://localhost:3000/gridSubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pressName: pressName, brandMark: brandMark }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("구독이 완료되었습니다.");
            // 구독 성공 메시지 또는 다른 작업을 수행할 수 있음
          } else {
            console.error("구독에 실패하였습니다.");
            // 구독 실패 메시지 또는 다른 작업을 수행할 수 있음
          }
        })
        .catch((error) => console.error("서버와의 통신 중 오류 발생:", error));
    }
  });
}
