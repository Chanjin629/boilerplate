const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config({path:"nodemailer/.env"});
const nodemailer = require("./nodemailer");

const getHTML = async(keyword) => {
    try{
        const html = (await axios.get(`https://www.jobkorea.co.kr/Search/?stext=${encodeURI(keyword)}`)).data;

        return html;
    }catch(e) {
        console.log(e);
    }
};

const parsing = async (page) => {
    const $ = cheerio.load(page);
    const jobs = [];
    const $jobList = $(".post");
    $jobList.each((idx, node) =>{
        const jobTitle = $(node).find(".title:eq(0)").text().trim(); //trim() 공백제거 함수
        const company = $(node).find(".name:eq(0)").text().trim();
        const experience = $(node).find(".exp:eq(0)").text().trim();
        const education = $(node).find(".edu:eq(0)").text().trim();
        const regularYN = $(node).find(".option > span:eq(2)").text().trim();
        const region = $(node).find(".long:eq(0)").text().trim();
        const dueDate = $(node).find(".date:eq(0)").text().trim();
        const etc = $(node).find(".etc:eq(0)").text().trim();

        if(
            experience.indexOf("신입")>-1 ||
            experience.indexOf("경력무관")>-1){
                jobs.push({
                    jobTitle,
                    company,
                    experience,
                    education,
                    regularYN,
                    region,
                    dueDate,
                    etc
                });
            }

        
    });
    
    return jobs;

};

const getJob = async(keyword) => {
    const html = await getHTML(keyword);
    const jobs = await parsing(html);

    console.log(jobs);
    return jobs;
};

const crawlingJob = async(keyword) =>{
    const jobs = await getJob("node.js");

    const j =[];
    j.push(`<table style="border:1px solid black; border-collapse:collapse;">`)
    j.push(`<thead>`);
    j.push(`<tr>`);
    j.push(`<th>구인제목</th>`);
    j.push(`<th>회사명</th>`);
    j.push(`<th>경력</th>`);
    j.push(`<th>학력</th>`);
    j.push(`<th>정규직여부</th>`);
    j.push(`<th>지역</th>`);
    j.push(`<th>구인마감일</th>`);
    j.push(`<th>비고</th>`);
    j.push(`</tr>`);
    j.push(`</thead>`);
    j.push(`<tbody>`);
    jobs.forEach(job => {
        j.push(`<tr>`);
        j.push(`<td>${job.jobTitle}</td>`);
        j.push(`<td>${job.company}</td>`);
        j.push(`<td>${job.experience}</td>`);
        j.push(`<td>${job.education}</td>`);
        j.push(`<td>${job.regularYN}</td>`);
        j.push(`<td>${job.region}</td>`);
        j.push(`<td>${job.dueDate}</td>`);
        j.push(`<td>${job.etc}</td>`);
        j.push(`</tr>`);
    });
    j.push(`</tbody>`);
    j.push(`</table>`);
    
    const emailData = {
        from : "sjcj99@naver.com",
        to: "sjcj99@naver.com",
        subject: "Node.js 구인 회사 정보",
        html : j.join(""),
    };

    nodemailer.send(emailData);
};
crawlingJob("node.js");