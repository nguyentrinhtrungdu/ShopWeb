import AnalysisBoard from '../conponent/analysisBoard';


function Category() {
    return (
        <div>
           

            <h1>Danh sách sản phẩm</h1>
            <AnalysisBoard endpoint="products" />
        </div>
    );
}
export default Category;