module.exports = {
    //prefix: 'tw-',
    content: [
        "./src/components/Navbars/CandidatureNavbar1.js",
        "./src/styles/**/*.{css,scss}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3B82F6", // Ajoutez des couleurs personnalisées si nécessaire
                secondary: "#10B981",
                uasz: "#33A17B",
                uasz_clair: "#80BF00",

            },
        },
    },
    plugins: [],
};