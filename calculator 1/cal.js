const display = document.getElementById("display");
      const buttons = document.querySelectorAll("button");
      const themeSlider = document.getElementById("themeSlider");

      let currentInput = "";
      let expression = "";

      const operators = ["+", "-", "x", "/"];

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.textContent;

          if (value === "RESET") {
            expression = "";
            currentInput = "";
            display.textContent = "0";
          } else if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            expression = expression.slice(0, -1);
            display.textContent = currentInput || "0";
          } else if (value === "=") {
            try {
              let result = eval(expression.replace(/x/g, "*"));
              display.textContent = result.toString();
              expression = result.toString();
              currentInput = result.toString();
            } catch {
              display.textContent = "Error";
              expression = "";
              currentInput = "";
            }
          } else {
            if (
              operators.includes(value) &&
              operators.includes(expression.slice(-1))
            ) {
              expression = expression.slice(0, -1);
              currentInput = currentInput.slice(0, -1);
            }
            currentInput += value;
            expression += value.replace("x", "*");
            display.textContent = currentInput;
          }
        });
      });

      function setTheme(theme) {
        document.body.className = "theme-" + theme;
        localStorage.setItem("calc-theme", theme);
      }

      themeSlider.addEventListener("input", () => {
        setTheme(themeSlider.value);
      });

      const savedTheme =
        localStorage.getItem("calc-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "1" : "2");
      themeSlider.value = savedTheme;
      setTheme(savedTheme);