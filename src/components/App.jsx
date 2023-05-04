import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');

  return (
    <AppStyle className={App}>
      <Searchbar setQuery={setQuery} />

      <ImageGallery query={query} />
    </AppStyle>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//   };
//   setQuery = query => {
//     this.setState({ query });
//   };

//   // useEffect(() => {
//   //   getImagesApi('cat', 1).then(res => console.log(res.data.hits));
//   // }, []);

//   render() {
//     return (
//       <AppStyle className={App}>
//         <Searchbar setQuery={this.setQuery} />

//         <ImageGallery query={this.state.query} />
//       </AppStyle>
//     );
//   }
// }
