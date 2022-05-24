<template lang="pug">
    div
        .l-container
            h2 Image and picture tests
            // img.test-image(src="@/assets/img/img01.jpg")
            // что то странное не четко загружается именно по ширине
            img.test-image(src="@/assets/img/img01.jpg"
                srcset="@/assets/img/img01.jpg 100w"
                sizes="100px"
            )
</template>

<script>


export default {}
</script>

<style lang="scss" scoped>
.test-image {
    display: block;
    width: 300px;
    max-width: 100%;
    height: auto;
}
</style>
