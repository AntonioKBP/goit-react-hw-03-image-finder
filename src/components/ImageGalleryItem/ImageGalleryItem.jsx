import { ListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map(item => (
        <ListItem key={item.id}>
          <Image src={item.webformatURL} alt={item.user} />
        </ListItem>
      ))}
    </>
  );
};

// // {
//   // /* <ListItem>
//   //     <Image src="" alt="" />
//   //   </ListItem> */
// }
