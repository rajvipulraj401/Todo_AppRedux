/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        josefin_sans: ["Josefin Sans", "sans-serif"]
      },
      colors: {
        primary_brightblue: "hsl(220, 98%, 61%)",
        check_background_1: "hsl(192, 100%, 67%)",
        check_background_2: "hsl(280, 87%, 65%)",
        neutral_lightgray: "hsl(0, 0%, 98%)",
        neutral_very_light_grayishblue: "hsl(236, 33%, 92%)",
        neutral_light_grayishblue: "hsl(233, 11%, 84%)",
        dark_grayishblue: "hsl(236, 9%, 61%)",
        verydark_grayishblue: "hsl(235, 19%, 35%)",
        darktheme_very_darkblue: "hsl(235, 21%, 11%)",
        darktheme_desaturatedblue: "hsl(235, 24%, 19%)",
        darktheme_grayishblue: "hsl(234, 39%, 85%)",
        darktheme_hover_grayishblue: "hsl(236, 33%, 92%)",
        darktheme_dark_grayishblue: "hsl(234, 11%, 52%)",
        darktheme_verydark_grayishblue: "hsl(233, 14%, 35%)",
        darktheme_verydark_grayishblue_2: "hsl(237, 14%, 26%)",
        main_background: "hsl(var(--main-background))",
        todo_item_background: "hsl(var(--todo-item-background))",
        todo_item_border: "hsl(var(--todo-item-border))",
        todo_item_completed: "hsl(var(--todo-item-completed))",
        todo_item_decoration: "hsl(var(--todo-item-decoration))",
        todo_item_text: "hsl(var(--todo-item-text))",
        todo_check_outline: "hsl(var(--todo-check-outline))",
        todo_remove_hover: "hsla(var(--todo-remove-hover))"
      },
      backgroundImage: {
        light_mobile: "url('/bg-mobile-light.jpg')",
        dark_mobile: "url('/bg-mobile-dark.jpg')",
        light_desktop: "url('/bg-desktop-light.jpg')",
        dark_desktop: "url('/bg-desktop-dark.jpg')",
        task_check: "url('/icon-check.svg')"
      },
    },
  },
  plugins: [],
}

