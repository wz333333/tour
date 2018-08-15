let pool = require('./pool');

module.exports = {
    // 查找所有景区分类
    findAllClassification: (handler) => {
        let sql = 'select * from classification';
        pool.excute(sql,handler);
    },

    //查找所有景区标签
    findAllLabel: (handler) => {
        let sql = 'select * from label';
        pool.excute(sql,handler);
    },

    //根据分类id查找景区标签
    findLabel: (handler) => {
        let sql = 'select * from label where classification_id = '+classification_id;
        pool.excute(sql,handler);
    }

}