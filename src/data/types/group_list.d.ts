declare module '../group_list_data.json' {
    interface GroupListData {
      id: number;
      name: string;
      image_file: string;
      participants: number;
    }
  
    const data: GroupListData;
  
    export default data;
  }