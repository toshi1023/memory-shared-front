declare module '../media_list_data.json' {
    interface MediaListData {
        id: number;
        image_file: string;
        title: string;
    }
  
    const data: MediaListData;
  
    export default data;
}