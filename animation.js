window.addEventListener('DOMContentLoaded', () => {
    // Hide all articles except the Ranong article

        const pathInit = document.querySelector('path#Ranong');
    pathInit.classList.add("active");

    const articles = document.querySelectorAll('.article-wrapper');
    articles.forEach((article) => {
      if (article.id === 'Ranong') {
        article.style.display = 'block';
      } else {
        article.style.display = 'none';
      }
    });
  
    // Your existing click event listener can remain the same
    const svgMap = document.getElementById('my-svg-map');
    svgMap.addEventListener('click', (e) => {
      if (e.target.tagName === 'path' || e.target.tagName === 'polygon') {
        const provinceID = e.target.id;
        articles.forEach((article) => {
          article.style.display = article.id === provinceID ? 'block' : 'none';
        });
      }
    });
  });


// Get all province paths (MAP)
const provincePaths = document.querySelectorAll('.province-path');

// Get the point path (MAP POINT)
const pointPath = document.querySelector('.point-path');

// Function to handle province click
function handleProvinceClick(event) {
  // Remove the color-change class from the previously selected province
  provincePaths.forEach(path => {
    path.classList.remove('active');
  });

  // Add the color-change class to the clicked province
  event.currentTarget.classList.add('active');

  // Update the point color to match the selected province's color
  pointPath.style.fill = event.currentTarget.style.fill; // Use the selected province's color

}

// Attach click event listeners to all province paths
provincePaths.forEach(path => {
  path.addEventListener('click', handleProvinceClick);
});
        
