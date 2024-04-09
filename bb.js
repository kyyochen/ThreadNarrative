const images = [
    {
        src: "https://assets.vogue.com/photos/5e5bc8d4b6a434000829616d/master/w_2240,c_limit/_ALE0359.jpg",
        alt: "Bal FW20 L36"  
    },
    {
        src: "https://assets.vogue.com/photos/5e5bc9c9cc7fbc000891e1ee/master/w_2240,c_limit/_ALE0448.jpg",
        alt: "Bal FW20 L44"
    },
    {
        src: "https://assets.vogue.com/photos/5e5bc940c2e83d000891c481/master/w_2240,c_limit/_ALE0753.jpg",
        alt: "Bal FW20 L72"
  
    },
    {
        src: "https://assets.vogue.com/photos/5e5bc920b9ad3900080ca5fa/master/w_2240,c_limit/_ALE0988.jpg",
        alt: "Bal FW20 L93"
    
    },
    {
      src: "https://assets.vogue.com/photos/5c7bbd08de0f032d4af67707/master/w_2240,c_limit/_ALE0363.jpg",
      alt: "Bal RTW Fall 2020 L47"  
    },
    {
      src: "https://assets.vogue.com/photos/5c7bc33415153e23adf25787/master/w_2240,c_limit/_ALE0695.jpg",
      alt: "Bal RTW Fall 2020 L78"
    },
    {
        src: "https://assets.vogue.com/photos/5c7bc5c880be832d57e5839c/master/w_2240,c_limit/_ALE0817.jpg",
        alt: "Bal RTW Fall 2020 L95"
  
    },
    {
      src: "https://assets.vogue.com/photos/6339b8145f4a1f20174db6a1/master/w_2240,c_limit/00032-balenciaga-spring-2023-ready-to-wear-credit-brand.jpg",
      alt: "Bal RTW Spring 2023 L31"  
    },  {
      src: "https://assets.vogue.com/photos/6339b937cf33f7b49b6b47a2/master/w_2240,c_limit/00075-balenciaga-spring-2023-ready-to-wear-credit-brand.jpg",
      alt: "Bal RTW Spring 2023 L74"
    }
    // Scalable, just add another src and alt to object as javascript allows for inherent dynamic resizing
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
