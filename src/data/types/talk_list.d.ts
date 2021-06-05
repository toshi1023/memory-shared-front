declare module '../talk_list_data.json' {
    interface TalkListData {
      id: number;
      user_name: string;
      image_file: string;
      content: string;
    }
  
    const data: TalkListData;
  
    export default data;
  }