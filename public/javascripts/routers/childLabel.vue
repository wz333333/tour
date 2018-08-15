<template>
    <span>
        <span class='label' v-for="label in labelsCmputed(id,labels)">
			<span>{{label.label_name}}</span>
        </span>
    </span>
</template>
<script>

import {scenics} from '../scenic.js';

let childLabel = {
    props: {
        id: Number,
        required: true
    },
    name:"childLabel",
    data:() => ({
        labels:scenics.labels
    }),
    methods:{
        labelsCmputed:(id,labels) => {
            return labels.filter(item =>　{
                    return item.classification_id == id;
                })
        }
    }
}

export default childLabel;
</script>
