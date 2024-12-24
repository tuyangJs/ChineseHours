type timeFormat = {
    (format?: string, currentTime?: Date): string;  // 普通格式
    (currentTime: Date): string;                    // 只传递时间
  };
  
  const GetHours: timeFormat = (format?: string | Date, currentTime: Date = new Date()) => {
      // 判断传入的第一个参数类型
      if (format instanceof Date) {
          currentTime = format; // 如果第一个参数是日期，则将其赋值给 currentTime
          format = "[地支]（[时辰]）[时刻]"; // 如果没有提供格式，则使用默认格式
      }
  
      // 如果 format 是 undefined，设置默认值
      if (!format) {
          format = "[地支]（[时辰]）[时刻]";
      }
  
      // 获取小时和分钟
      const hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
  
      const 十二地支 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
      const 十二辰时 = ["夜半", "鸡鸣", "平旦", "日出", "食时", "隅中", "日平", "日昳", "晡时", "日入", "黄昏", "人定"];
      const CNint = ['一', '二', '三', '四', '五', '六', '七', '八'];
      const i = TimeIndex(hours);
      minutes = (TimeIndex(hours - 1) === i) ? (60 + minutes) : minutes; // 计算是否延长分钟大于60
      const 刻 = Math.floor(minutes / 15);  // 每时辰划分为8刻
  
      // 替换格式中的占位符
      format = format.replace("[地支]", 十二地支[i] + '时');
      format = format.replace("[时辰]", 十二辰时[i]);
      format = format.replace("[时刻]", CNint[刻] + '刻');
  
      // 时间索引函数
      function TimeIndex(h: number) {
          return Math.floor((h + 1) / 2);
      }
  
      return format;
  };
/*   const customDate = new Date('2024-12-24T14:30:00');
  console.log(GetHours('地支：[地支] 时辰：[时辰] 时刻:[时刻]',customDate)) */
  
  export { GetHours };
  export type { timeFormat };
  