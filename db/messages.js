let pool = require('./pool');


module.exports = {

    // 查找所有留言
    findAllMessages: (handler) => {
        let sql = 'select * from message';
        pool.excute(sql,handler);
    },

    // 添加留言
    addMessage: (array,handler) => {
        let sql = "insert into message values(null,'"+array[0]+"','"+array[1]+"','"+array[2]+"',0,"+array[3]+",'"+array[4]+"',0)";

        pool.excute(sql,handler);
    },

    // 更新留言图片信息
    repeadImgSrc: (array,handler) => {
        let sql = "update message set message_image = '"+array[1]+"' where user_id = "+array[0]+"";
        pool.excute(sql,handler);
    },

    // 添加评论
    addComment: (array,handler) => {
        let sql = "insert into comment values(null,'"+array[0]+"',"+array[1]+","+array[2]+")";
        pool.excute(sql,handler);
    },

    // 查询所有评论
    findComments: (handler) => {
        let sql = "select * from comment";
        pool.excute(sql,handler);
    },

    // 更新评论数
    addCommentNum: (array,handler) => {
        let sql = "update message set comments = "+array[1]+" where id = "+array[0]+"";
        pool.excute(sql,handler);
    },

    // 更新点赞数
    addPraiseNum: (array,handler) => {
        let sql = "update message set praise = "+array[1]+" where id = "+array[0]+"";
        pool.excute(sql,handler);
    }
}