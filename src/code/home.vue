<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from 'vue'
const route = useRoute();
const router = useRouter();
const id = ref('')
const info = ref('')
const name = ref('')
const password = ref('')
const host = 'https://db-api.amarea.cn'
onMounted(() => {
  id.value = route.params.id;
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/users/${id.value}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        info.value = data
      })
})
</script>

<template>
    <div id="background">
        <div ><span id="logo">Welcome！{{info.name}}</span></div>
        <div id="container">

        </div>
        <div id="clock">
            <div id="time">{{time}}</div>
            <div id="date">{{date}}</div>
        </div>
        <div id="copyright">Copyright © 2022 yty .All Right Reserved.</div>
    </div>
</template>

<style scoped>
@property --xPoint {
  syntax: '<length>';
  inherits: false;
  initial-value: 400px;
}
@property --yPoint {
  syntax: '<length>';
  inherits: false;
  initial-value: 300px;
}
#background{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    margin:0px;
    background:
        conic-gradient(
            from -45deg at 400px 300px,
            hsla(170deg, 100%, 70%, .7),
            transparent 50%,
            hsla(219deg, 90%, 80%, .5) 100%),
            linear-gradient(-45deg, #060d5e, #002268); 
}

#logo{
    color: rgb(12, 132, 40);
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 15%;
    left: 15%;
}
#clock{

    color: aliceblue;
    position: absolute;
    top: 30%;
    left: 38%;
    text-align: left;
}
#time{
    font-size: 120px;
}
#date{
    font-size: 30px;
}
#copyright{
    color: white;
    position: absolute;
    top: 95%;
    left: 38%;
}
</style>


<script>
export default {
    data(){
        return{
            time:"",
            data:"",
        };
    },
    mounted(){
        this.$nextTick(()=>{
            setInterval(this.update_clock,1000);
        })
    },
    methods:{
        update_clock:function(e){
            var d=new Date();
            var year=d.getFullYear();
            if(year<10){
                year="0"+year
            }
            var mon=d.getMonth()+1;
            if(mon<10){
                mon="0"+mon
            }
            var day=d.getDate();
            if(day<10){
                day="0"+day
            }
            var hour=d.getHours();
            if(hour<10){
                hour="0"+hour
            }
            var min=d.getMinutes();
            if(min<10){
                min="0"+min
            }
            this.time=hour+":"+min;
            this.date=year+"/"+mon+"/"+day;
        }
        
    },
}
</script>>
