const images = [
    {
        src: "https://assets.vogue.com/photos/5aa83fd185604a74564ec1a4/master/w_2240,c_limit/martin-margiela-spring-2008-rtw-19-vika-kuropyatnikova.jpg",
        alt: "MM RTW Spring 2008 "
    },
    {
        src: "https://assets.vogue.com/photos/55c650c408298d8be215c74e/master/w_2240,c_limit/00070fullscreen.jpg",
        alt: "MM SS12 L7"  
    },
    {
        src: "https://assets.vogue.com/photos/55c6513008298d8be21d1d20/master/w_2240,c_limit/_ARC0310.1366x2048.JPG",
        alt: "MM FW14 L27"
    
    },
    {
        src: "https://assets.vogue.com/photos/55c650f008298d8be218aeb8/master/w_2240,c_limit/00010fullscreen.jpg",
        alt: "MM F12 Couture L1"  
    },
    {
        src: "https://assets.vogue.com/photos/5772a3a23b2b98273965d3c4/master/w_2240,c_limit/01-maison-margiela-2017.jpg",
        alt: "MM Resort 2017 L1"
    },
    {
        src: "https://assets.vogue.com/photos/576cfdd6d7b4aeda348f5a9e/master/w_2240,c_limit/KIM_0110.jpg",
        alt: "MM SS17 L5"
  
    },

    {
        src: "https://assets.vogue.com/photos/651b23adb25526aaa2adf177/master/w_2240,c_limit/00033-maison-margiela-spring-2024-ready-to-wear-credit-gorunway.jpg",
        alt: "MM RTW Spring 2024 L33"
  
    },
    {
      src: "https://assets.vogue.com/photos/5f7c889da5b54f9962272a49/master/w_2240,c_limit/00020-Maison-Margiela-RTW-Spring-21.jpg",
      alt: "MM RTW Spring 2021"  
    },  {
      src: "https://assets.vogue.com/photos/5e565fb0c38fac0008aa2b7e/master/w_2240,c_limit/_ALE0156.jpg",
      alt: "MM RTW Fall 2020"
    }
    // Add more image objects as needed
  ];
  
  function showImages() {
    const imageTrack = document.getElementById("image-track");
    imageTrack.innerHTML = "";
  
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imgElement = document.createElement("img");
        imgElement.className = "image";
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.draggable = false;
        imgElement.dataset.flipped = false;
        imageTrack.appendChild(imgElement);
    }
  }
  
  // Call the showImages function when the page loads or whenever appropriate
  showImages();
  const track = document.getElementById("image-track");
  
  const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
  
  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";  
    track.dataset.prevPercentage = track.dataset.percentage;
  }
  
  const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
          
    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -110);
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
      transform: `translate(${nextPercentage}%, -60%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
  }
  
  window.onmousedown = e => handleOnDown(e);
  
  window.ontouchstart = e => handleOnDown(e.touches[0]);
  
  window.onmouseup = e => handleOnUp(e);
  
  window.ontouchend = e => handleOnUp(e.touches[0]);
  
  window.onmousemove = e => handleOnMove(e);
  
  window.ontouchmove = e => handleOnMove(e.touches[0]);
  
  document.getElementById('addImageButton').addEventListener('click', function() {
    const imageUrl = document.getElementById('newImageUrl').value;
    const imageAlt = document.getElementById('newImageAlt').value;

    if (imageUrl && imageAlt) {
        const imgElement = document.createElement('img');
        imgElement.className = 'image';
        imgElement.src = imageUrl;
        imgElement.alt = imageAlt;
        document.getElementById('image-track').appendChild(imgElement);

        document.getElementById('newImageUrl').value = '';
        document.getElementById('newImageAlt').value = '';
    } else {
        alert('Please fill in both fields.');
    }
});
