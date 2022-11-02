// import {interiorPlaceType, landscapePlaceType, publicPlaceType, realizationPlaceType} from "./enum";
// import React from "react";
//
// const placeTypeByPath =()=>{
// 	if
//     if (location.pathname === '/') {
//         return interiorPlaceType.map((type: { id: number; value: string }) => (
//             <li key={type.id}>
//                 <input
//                     value={type.value}
//                     onChange={e => {
//                         handleChange(e, 'selectedType')
//                         setPage(1)
//                     }}
//                     checked={!!selectedType.find(item => item === type.value)}
//                     type='checkbox'
//                 />
//                 {type.value}
//                 <span className='checkmark'> </span>
//             </li>
//         ))
//     } else if (location.pathname === '/public') {
//         return publicPlaceType.map((type: { id: number; value: string }) => (
//             <li key={type.id}>
//                 <input
//                     value={type.value}
//                     onChange={e => handleChange(e, 'selectedType')}
//                     checked={!!selectedType.find(item => item === type.value)}
//                     type='checkbox'
//                 />
//                 {type.value}
//             </li>
//         ))
//     } else if (location.pathname === '/landscape') {
//         return landscapePlaceType.map((type: { id: number; value: string }) => (
//             <li key={type.id}>
//                 <input
//                     value={type.value}
//                     onChange={e => handleChange(e, 'selectedType')}
//                     checked={!!selectedType.find(item => item === type.value)}
//                     type='checkbox'
//                 />
//                 {type.value}
//             </li>
//         ))
//     } else if (location.pathname === '/realization') {
//         realizationPlaceType.map((type: { id: number; value: string }) => (
//             <li key={type.id}>
//                 <input
//                     value={type.value}
//                     onChange={e => handleChange(e, 'selectedType')}
//                     checked={!!selectedType.find(item => item === type.value)}
//                     type='checkbox'
//                 />
//                 {type.value}
//             </li>
//         ))
//     }
// }
// export default placeTypeByPath
export default {}
