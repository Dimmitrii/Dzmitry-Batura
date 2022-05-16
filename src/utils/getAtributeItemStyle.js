export default function getAttributeItemStyle(attributeType, isSelected, isLast, isCart){
    const styles = {};
    if(attributeType === "swatch"){
        styles.marginRight = "8px";
        if(isSelected){
            styles.border = "1px solid #5ECE7B";
        }
    }
    if(attributeType === "text"){
        styles.marginRight = isCart ? "8px" : "12px";
        if(isSelected){
            styles.backgroundColor = "#1D1F22";
            styles.color = "#FFFFFF";
        }
    }
    if(isLast){
        styles.marginRight = "0px"
    }
    return styles;
}