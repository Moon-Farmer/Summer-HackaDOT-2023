import { useState, useEffect } from 'react';
import { createUnNestedToken } from '../utils/Game';
import { burnToken } from '../utils/Game';
import { LandQuery } from "./Query/LandQuery";


export const Shovel_confirm = ({sdk, signer, id}) => {
    //Query States
    const [landLastRes, setLandLastRes] = useState(null);
    const address = signer.address;
    const confirm_destory = async() => {
        //get land id
        const land_id = id;

        //get seed id nested inside land
        const childArgs = {
            collectionId: 1619,
            tokenId: land_id,
        };
        let seed_id;
        const land_children = await sdk.token.children(childArgs);
        // console.log('land children', land_children);
        for(let i=0; i<land_children.children.length; i++){
            if(land_children.children[i].collectionId==1639){
                seed_id = land_children.children[i].tokenId;
            }
        }
        // console.log('shovel seed id', seed_id);

        //unnest from seed collection
        const unnest_token = await createUnNestedToken(sdk, {
            address,
            parent: {
                collectionId: 1619,
                tokenId: land_id,
            },
            nested: {
                collectionId: 1639,
                tokenId: seed_id,
            }
        })
        // console.log('unnest token', unnest_token);

        //burn seed
        const burnArgs = {
            tokenId: seed_id,
            collectionId: 1639,
            address: address,
        }
        const result = await burnToken(sdk, burnArgs);
        // console.log('burned!', result);
    }

    //#fetch land collection
    let landCurrentRes = LandQuery(signer);
    console.log(landCurrentRes);
    if (landCurrentRes !== landLastRes) {
        setLandLastRes(landCurrentRes);
    }

    return(
        <>
        <div>
            <button
<<<<<<< HEAD
                onClick={confirm_destory}
                className="text-2xl mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-amber-400 shadow-lg shadow-amber-400/50 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:-translate-y-1 hover:scale-110 hover:bg-amber-600">
=======
                onClick={onclose}>
                    Cancel
            </button>
            <button
                onClick={confirm_destory}>
>>>>>>> 96106bff792686a77d0fa1ea0a6f30a4d307768e
                    Confirm
            </button>
        </div>
        </>
    )
}