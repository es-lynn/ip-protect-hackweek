// import { DialogContent, DialogOverlay } from '@reach/dialog'
// import { useGridSize } from 'commons/util/hooks/useGridSize'
// import * as faker from 'faker'
// import React, { ReactElement, useEffect, useState } from 'react'
//
// /**
//  * ModalLayout is the actual layout file
//  */
// type P = {
//   visibility: boolean
//   close: () => void
//   children: ReactElement
// }
//
// export const DrawerLayout = (p: P) => {
//   const gridSize = useGridSize()
//
//   if (gridSize === 'xs' || gridSize === 'sm') {
//     return (
//       <DialogOverlay
//         onDismiss={() => {
//           p.close()
//           p.close()
//         }}
//       >
//         <DialogContent
//           style={{
//             backgroundColor: 'red',
//             padding: '0 0 0 0',
//             marginBottom: 0,
//             width: '100%',
//             position: 'absolute',
//             bottom: 0
//           }}
//         >
//           <div
//             style={{
//               borderTopLeftRadius: 25,
//               borderTopRightRadius: 25,
//               backgroundColor: 'white',
//               padding: 24,
//               overflowY: 'auto',
//               maxHeight: '80vh'
//             }}
//           >
//             {p.children}
//           </div>
//         </DialogContent>
//       </DialogOverlay>
//     )
//   }
//   return (
//     <DialogOverlay onDismiss={p.close}>
//       <DialogContent
//         style={{
//           marginTop: 0,
//           marginRight: 0,
//           marginBottom: 0,
//           minHeight: '100%'
//         }}
//       >
//         {p.children}
//       </DialogContent>
//     </DialogOverlay>
//   )
// }
//
// // export const ModalLayout = (p: P) => {
// //   switch (p.style) {
// //     case "dialog":
// //       return (
// //         <DialogOverlay isOpen={p.visibility} onDismiss={p.close}>
// //           <DialogContent>{p.children}</DialogContent>
// //         </DialogOverlay>
// //       );
// //     case "drawer":
// //       return <DrawerLayout {...p} />;
// //   }
// // };
