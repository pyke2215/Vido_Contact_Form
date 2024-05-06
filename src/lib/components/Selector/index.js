import CareerData from "./data"
const Selector = (props) => {
    return (
        <select name="career" id="career" class="form-control" onChange={props.onChange}>
            <option value="Chọn Ngành">Chọn Ngành</option>
            {
                CareerData.map((item) => {
                    return (
                        <option value={item.name}>{item.name}</option>
                    )
                })
            }
        </select>
    )
};

export default Selector;