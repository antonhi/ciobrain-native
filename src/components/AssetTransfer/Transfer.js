import { getAllAssets, pushAssetsWithUrlPassword } from "../../common/Asset";
import { AssetCategoryEnum } from "../AssetCategoryEnum";

const transfer = async (url, password) => {
    if (!url || url.length === 0) return false;
    const categories = await getData();
    const counts = {
        imported: 0,
        duplicate: 0,
        invalid: 0
    }
    for (const category in categories) {
        console.log(category);
        const response = await pushAssetsWithUrlPassword(category, categories[category], url, password);
        if (response) {
            counts.imported += response.imported | 0
            counts.duplicate += response.duplicate | 0
            counts.invalid += response.invalid | 0
        }
    }
    return counts;
}

const getData = async () => {
    const categories = {};
    const assets = await getAllAssets();
    Object.values(AssetCategoryEnum).forEach(c =>
        categories[c.name] = []
    );
    assets.forEach(asset => {
        const category = Object.values(AssetCategoryEnum).find(c =>
            asset.hasOwnProperty(c.name + " ID"));
        if (category.name) {
            categories[category.name].push(asset);
        }
    });
    return categories;
}

export default transfer;