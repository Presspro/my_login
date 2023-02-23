<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()
const user = ref('')
const name = ref('')
const password = ref('')
const repeat = ref('')
const host = 'https://db-api.amarea.cn'

function login() {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    }
    fetch(`${host}/users/${user.value}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.id === user.value) {   // 验证是否存在该用户return data
            }
            else {
                throw new Error("用户名不存在")
            }
            if (data.password === password.value) {
                router.push({
                    name: "home",
                    params: {
                        id: data.id,
                    }
                })
            } 
            else {
                throw new Error("密码错误")
            }
        })
        .catch(err => alert(err))
}

function sign() {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    }
    requestOptions.body = JSON.stringify({
        id: user.value,
        name: name.value,
        password: password.value,
    });
    if (repeat.value !== password.value) {
        alert("两次输入的密码不一致，请检查")
    } 
    else {
        fetch(`${host}/users`, requestOptions) // 这里的网址没有id
        .then(response => response.json())
        .then(data => alert(data.id+"，注册成功"))
    }
}

</script>

<template>
    <div id="background">
        <div id="disc">Welcome to this page！</div>
        <div id="clock">
            <div id="time">{{time}}</div>
            <div id="date">{{date}}</div>
        </div>
        <div id="container">
            <div id="login">
                <el-card class="box-card" id="card_login">
                    <div id="form">
                        <el-input v-model="user" placeholder="请输入用户名"></el-input>
                        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                        <el-button id="bs1" type="primary" @click="login">登&emsp;录</el-button>
                        <el-button id="bs2" type="primary" @click="handleFlip">点击注册</el-button>
                        <p id="p_login">没有账号就注册一个吧</p>
                    </div>
                </el-card>
            </div>
            <div id="sign">
                <el-card class="box-card" id="card_sign">
                    <div id="form">
                        <el-input v-model="user" placeholder="请输入用户名"></el-input>
                        <el-input v-model="name" placeholder="请输入昵称"></el-input>
                        <el-input type="password" placeholder="请输入密码" v-model="password" show-password></el-input>
                        <el-input type="password" placeholder="请再次输入密码" v-model="repeat" show-password></el-input>
                        <el-button type="primary" @click="sign">注册</el-button>
                        <el-button id="bs3" type="primary" @click="handleFlip">点击登录</el-button>
                        <p id="p_sign">已有账号？→</p>
                    </div>
                </el-card>
            </div>
        </div>
        
        <div id="copyright">Copyright © 2022 yty Right Reserved.</div>
    </div>
</template>

<style scoped>
#background{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: url(../assets\a.jpeg) no-repeat;
    background-size:100% 100%; 
}

#disc{
    color: rgb(184, 187, 190);
    font-size: 30px;
    font-weight: 800;
    text-transform: uppercase;
    position: absolute;
    top: 15%;
    left: 10%;
}
#container{
    transform-style: preserve-3d;
    transition: all 0.5s;
    transform-origin: 50% 50%;
    position: absolute;
    top: 30%;
    left: 38%;
}
#login,
#sign{
    position: absolute;
    width: 373px;
    height: 210px;
    border-radius: 15px;
    backface-visibility:hidden;
    transform-origin: left bottom;
}
#login{
    z-index: 1;
}
#sign{
    transform: rotateY(180deg);
}
.el-card{
    background-color: rgba(255, 255,255, 0.7);
    
}
#form{
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
}
.el-button{
    margin-left: 20px;
}
#p_login{
    font-size: 12px;
}
#p_sign{
    display: inline;
    float: left;
}

#bs2{
 margin-left: 100px;
}
#bs3{
    margin-left: 125px;  
}
#clock{
    color: white;
    position: absolute;
    top: 70%;
    left: 15%;
    text-align: left;
}
#time{
    font-size: 100px;
}
#date{
    font-size: 35px;
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
    name: "Mall",
    components: {},
    data(){
        return{
            time:"",
            data:"",
            flag: true
        };
    },
    mounted(){
        this.$nextTick(()=>{
            setInterval(this.update_clock,1000);
        })
    },
    methods:{
        handleFlip() {
            let container = document.getElementById('container')
            container.style.transform = this.flag ? 'rotateY(180deg)':''
            this.flag = !this.flag
        },
        update_clock:function(e){
            var time=new Date();
            var year=time.getFullYear();
            if(year<10){
                year="0"+year
            }
            var mon=time.getMonth()+1;
            if(mon<10){
                mon="0"+mon
            }
            var day=time.getDate();
            if(day<10){
                day="0"+day
            }
            var hour=time.getHours();
            if(hour<10){
                hour="0"+hour
            }
            var min=time.getMinutes();
            if(min<10){
                min="0"+min
            }
            this.time=hour+":"+min;
            this.date=year+"/"+mon+"/"+day;
        }
        
    },
    
}
</script>>