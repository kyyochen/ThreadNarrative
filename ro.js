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

const images = [
    {
        src: "https://assets.vogue.com/photos/6009b3bebe5ccf716b2b84dd/master/w_2240,c_limit/00013-RICK-OWENS-MENSWEAR-FALL-21.jpg",
        alt: "RO FW21 L13"  
    },
    {
        src: "https://assets.vogue.com/photos/5d0b69848543470454dfc22f/master/w_2240,c_limit/_ALE0018.jpg",
        alt: "RO SS20 L1"
    },
    {
        src: "https://assets.vogue.com/photos/57ed4a411446bf170395c979/master/w_2240,c_limit/_UMB6237.jpg",
        alt: "RO RTW Spring 2017"
  
    },
    {
        src: "https://assets.vogue.com/photos/5a608d5003798d1f95f6e5ba/master/w_2240,c_limit/_OWE0039.jpg",
        alt: "RO FW18 L1"
    
    },
    {
      src: "https://assets.vogue.com/photos/5e2055de98be090008e4471f/master/w_2240,c_limit/_SDR0294.jpg",
      alt: "RO FW20 L21"  
    },
    {
      src: "https://assets.vogue.com/photos/604114ed6278f586c752e873/master/w_2240,c_limit/_CSC0433.jpg",
      alt: "RO RTW Fall 2021"
    },
    {
        src: "https://assets.vogue.com/photos/64944a5af496fd5039bb2765/master/w_2240,c_limit/00003-rick-owens-spring-2024-menswear-credit-gorunway.jpg",
        alt: "RO SS24 L3"
  
    },
    {
      src: "https://assets.vogue.com/photos/5e57f6bf0a35fd0009e11034/master/w_2240,c_limit/IS5_0020.jpg",
      alt: "RO RTW Fall 2020 L1"  
    },  {
      src: "https://assets.vogue.com/photos/5b2b87cd7357fe57e6f171d1/master/w_2240,c_limit/_LLL4738.jpg",
      alt: "RO SS19 L16"
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
  
