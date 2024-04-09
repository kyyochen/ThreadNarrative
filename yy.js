const images = [
    {
        src: "https://wwd.com/wp-content/uploads/2019/01/yohji-yamamoto-pre-fall-2019-paris-fashion-week-pfw-001-1.jpg?w=682",
        alt: "YY FW19 L1"
    },
    {
        src: "https://assets.vogue.com/photos/5d8e6a6f76baba00082804c8/master/w_2240,c_limit/_ALE0005.jpg",
        alt: "YY SS20 L1"
  
    },
    {
      src: "https://assets.vogue.com/photos/5d8e6ad26e38b7000843b7cd/master/w_2240,c_limit/_ALE0046.jpg",
      alt: "Y SS20 L5"  
    },
    {
      src: "https://assets.vogue.com/photos/63c9993e426d4c71724c345f/master/w_1280,c_limit/00010-yohji-yamamoto-fall-2023-menswear-credit-gorunway.jpg",
      alt: "YY FW23 L10"
    },
    {
        src: "https://assets.vogue.com/photos/63c9992e72fc0d5741d3ba6e/master/w_1280,c_limit/00001-yohji-yamamoto-fall-2023-menswear-credit-gorunway.jpg",
        alt: "YY FW23 L"
  
    },
    {
      src: "https://assets.vogue.com/photos/5d8e6b074801ac0008959c68/master/w_2240,c_limit/_ALE0542.jpg",
      alt: "YY SS20 L32"  
    },  {
      src: "https://assets.vogue.com/photos/60d472ac2cb5442a71782d55/master/w_2240,c_limit/00011-Yohji-Yamamoto-Paris-Menswear-Spring-22.jpg",
      alt: "YY SS22 L11"
    },
    {
      src: "https://assets.vogue.com/photos/62b494cffe327c792e1f17f4/master/w_2240,c_limit/00030-yohji-yamamoto-spring-2023-mens-credit-takay.jpg",
      alt: "YY SS23 L30"
  
    },
    {
    src: "https://assets.vogue.com/photos/62b494d1af16acce0f7815c4/master/w_2240,c_limit/00034-yohji-yamamoto-spring-2023-mens-credit-takay.jpg",
    alt: "YY SS23 L34"  
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
