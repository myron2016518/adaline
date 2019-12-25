module.exports = {
    // presets: [
    //     '@vue/app'
    // ],
    presets: [
        [
            "@vue/app",
            { "useBuiltIns": "entry" }
        ]
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "~theme"
            }
        ]
    ]
}
