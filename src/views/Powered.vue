<template>
    <div>
        Powered by
    </div>
</template>

<script>
    import { mutations } from '@/state';

    export default { 
        mounted() {
            console.log('motantao');
            mutations.setTitle(' ');
        }
        
    }
</script>

<style lang="scss" scoped>

</style>