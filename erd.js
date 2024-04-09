const images = [
    {
        src: "https://assets.vogue.com/photos/5a678643ea8d2c41f887ae05/master/w_2240,c_limit/03-enfants-riches-deprimes-fall-winter-2018-mens.jpg",
        alt: "ERD FW18 L3"  
    },
    {
        src: "https://assets.vogue.com/photos/5aa1c8784650d478d14ab6de/master/w_2240,c_limit/07-enfants-riches-deprimes-fall-2018.jpg",
        alt: "ERD RTW Fall 2018 L7"
    },
    {
        src: "https://assets.vogue.com/photos/5aa1c8744650d478d14ab6dc/master/w_2240,c_limit/02-enfants-riches-deprimes-fall-2018.jpg",
        alt: "ERD RTW Fall 2018 L2"
  
    },
    {
        src: "https://assets.vogue.com/photos/5b31194a13302553811d89f0/master/w_2240,c_limit/00015-Enfants-Riches-Deprimes-Vogue-Menswear-2019-pr.jpg",
        alt: "ERD SS19 L15"
    
    },
    {
      src: "https://assets.vogue.com/photos/5bb4e3cf1982d32dc8886e29/master/w_2240,c_limit/00005-enfant-riches-deprimes-spring-2019-ready-to-wear-credit-Henri-Levy.jpg",
      alt: "ERD RTW Spring 2019 L6"  
    },
    {
      src: "https://assets.vogue.com/photos/5bb4e3be8accb42d80188fe4/master/w_2240,c_limit/00006-enfant-riches-deprimes-spring-2019-ready-to-wear-credit-Henri-Levy.jpg",
      alt: "ERD RTW Spring 2019 L7"
    },
    {
        src: "https://assets.vogue.com/photos/5c4321cf8d30d32d081ed9f3/master/w_2240,c_limit/00012-enfants-riches-deprimes-menswear-paris-fall-19.jpg",
        alt: "ERD FW19 L12"
  
    },
    {
      src: "https://assets.vogue.com/photos/5d13f5165d438d0008c3520a/master/w_2240,c_limit/00005-Enfants-Riches-Deprimes-Mens-SS20-credit-Henri-Alexander-Levy.jpg",
      alt: "ERD SS20 L5"  
    },  {
      src: "https://assets.vogue.com/photos/5e2869c8b9adcd0008481eb7/master/w_2240,c_limit/00006-Enfants-Riches-Deprimes-Mens-Fall-20.jpg",
      alt: "ERD FW20 L6"
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
