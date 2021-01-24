import wurl from 'wurl';

const simpleClone = obj => JSON.parse(JSON.stringify(obj));

const delete3Dhost = threeDJson => {
    const copy3D = simpleClone(threeDJson);
    if (copy3D.backgroundWebUrl) {
        copy3D.backgroundWebUrl = wurl('path', copy3D.backgroundWebUrl);
        // copy3D.backgroundWebUrl = `${root}/files${copy3D.backgroundWebUrl}`;
    }
    if (copy3D.modelWebUrl) {
        copy3D.modelWebUrl = wurl('path', copy3D.modelWebUrl);
        // copy3D.modelWebUrl = `${root}/files${copy3D.modelWebUrl}`;
    }

    let interactiveCamera = null;
    if (copy3D.modelAttributeList && copy3D.modelAttributeList.length > 0) {
        for (let item of copy3D.modelAttributeList) {
            if (item.modelType === '可交互摄像机') {
                interactiveCamera = item;
            }
        }
    }
    if (
        interactiveCamera &&
        interactiveCamera.modelAssetsList &&
        interactiveCamera.modelAssetsList.length > 0
    ) {
        for (let camera of interactiveCamera.modelAssetsList) {
            camera.assetsUrl = wurl('path', camera.assetsUrl);
        }
    }
    // if (process.env.NODE_ENV === "development") {
    //     if (copy3D.backgroundWebUrl) {
    //         copy3D.backgroundWebUrl = wurl('path', copy3D.backgroundWebUrl);
    //     }
    //     if (copy3D.modelWebUrl) {
    //         copy3D.modelWebUrl = wurl('path', copy3D.modelWebUrl);
    //     }

    //     let interactiveCamera = null;
    //     if (copy3D.modelAttributeList && copy3D.modelAttributeList.length > 0) {
    //         for (let item of copy3D.modelAttributeList) {
    //             if (item.modelType === '可交互摄像机') {
    //                 interactiveCamera = item;
    //             }
    //         }
    //     }
    //     if (interactiveCamera && interactiveCamera.modelAssetsList && interactiveCamera.modelAssetsList.length > 0) {
    //         for (let camera of interactiveCamera.modelAssetsList) {
    //             camera.assetsUrl = wurl('path', camera.assetsUrl);
    //         }
    //     }
    // } else {
    // }

    return copy3D;
};
const delete3DconfigHost = config => {
    const copy3D = simpleClone(config);
    if (process.env.NODE_ENV === 'development') {
        copy3D.buildJsonPath = wurl('path', copy3D.buildJsonPath);
        copy3D.unityLoaderPath = wurl('path', copy3D.unityLoaderPath);
    }

    return copy3D;
};

export default {
    delete3Dhost,
    delete3DconfigHost,
};
