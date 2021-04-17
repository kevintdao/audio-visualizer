import { Button } from 'react-bootstrap'
import React from 'react'


// will contain button that user presses once to active recording feature, and can press once more when recording is over

export function Record() {
    const recordFunc = () => {
        console.log("Hey fellas you're in the recordFun");
    };
    return (
        <div>
            <Button onClick={recordFunc} >Start Recoding</Button>

        </div>
    )
}
