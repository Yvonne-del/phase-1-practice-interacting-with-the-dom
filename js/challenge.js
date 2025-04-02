document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById("counter");
    let minusBtn = document.getElementById("minus");
    let plusBtn = document.getElementById("plus");
    let heartBtn = document.getElementById("heart");
    let pauseBtn = document.getElementById("pause");
    let likesList = document.querySelector(".likes");
    let commentForm = document.getElementById("comment-form");
    let commentInput = document.getElementById("comment-input");
    let commentList = document.getElementById("list");
    
    let count = 0;
    let isPaused = false;
    let likeCounts = {};
  
    function startTimer() {
      return setInterval(() => {
        if (!isPaused) {
          count++;
          counter.innerText = count;
        }
      }, 1000);
    }
  
    let timer = startTimer();
  
    plusBtn.addEventListener("click", () => {
      count++;
      counter.innerText = count;
    });
  
    minusBtn.addEventListener("click", () => {
      count--;
      counter.innerText = count;
    });
  
    heartBtn.addEventListener("click", () => {
      if (!likeCounts[count]) {
        likeCounts[count] = 1;
      } else {
        likeCounts[count]++;
      }
      let existingLike = document.querySelector(`[data-num='${count}']`);
      if (existingLike) {
        existingLike.innerText = `${count} has been liked ${likeCounts[count]} times`;
      } else {
        let li = document.createElement("li");
        li.setAttribute("data-num", count);
        li.innerText = `${count} has been liked ${likeCounts[count]} times`;
        likesList.appendChild(li);
      }
    });
  
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(timer);
        pauseBtn.innerText = "resume";
        plusBtn.disabled = true;
        minusBtn.disabled = true;
        heartBtn.disabled = true;
      } else {
        timer = startTimer();
        pauseBtn.innerText = "pause";
        plusBtn.disabled = false;
        minusBtn.disabled = false;
        heartBtn.disabled = false;
      }
    });
  
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let commentText = commentInput.value.trim();
      if (commentText !== "") {
        let p = document.createElement("p");
        p.innerText = commentText;
        commentList.appendChild(p);
        commentInput.value = "";
      }
    });
  });