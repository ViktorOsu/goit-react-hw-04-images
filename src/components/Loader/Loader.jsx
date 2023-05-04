import React from 'react';
import { Dna } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderStyled className={Loader}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </LoaderStyled>
  );
};

// import { Component } from 'react';
// import { Dna } from 'react-loader-spinner';
// import { LoaderStyled } from './Loader.styled';

// export class Loader extends Component {
//   render() {
//     return (
//       <LoaderStyled className={Loader}>
//         <Dna
//           visible={true}
//           height="80"
//           width="80"
//           ariaLabel="dna-loading"
//           wrapperStyle={{}}
//           wrapperClass="dna-wrapper"
//         />
//       </LoaderStyled>
//     );
//   }
// }
