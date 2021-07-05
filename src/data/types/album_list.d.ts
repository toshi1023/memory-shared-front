declare module '../album_list_data.json' {
    interface AlbumListData {
      id: number;
      name: string;
      image_file: string;
    }
  
    const data: AlbumListData;
  
    export default data;
  }