// Function to load HTML components dynamically
function loadComponent(id, file) {
    fetch(`components/${file}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error loading ${file}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById(id).innerHTML = html;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  // Load components
  loadComponent("header", "header.html");
  // loadComponent("content", "main.html");
  loadComponent("footer", "footer.html");
  