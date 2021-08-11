declare module '../news_list_data.json' {
    interface NewsListData {
      id: number;
      title: string;
      content: string;
    }
  
    const data: NewsListData;
  
    export default data;
  }