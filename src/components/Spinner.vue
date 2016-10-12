<template lang="html">
    <div class="text-xs-center loader-container">
        <div class="loader"></div>
        <small>Loading</small>
    </div>
</template>

<style lang="css">
.loader {
    border: 4px solid #d9d9d9; /* Light grey */
    border-top: 4px solid #444444; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
    display: inline-block;
}

.loader-container {
    margin: 100px 0;
}

.loader-container small {
    display: block;
    letter-spacing: 4px;
    padding-top: 10px;
    color: #939393;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
