const sortAsc = (item1, item2) => {
    return item1.frontmatter.order - item2.frontmatter.order
};

export {
    sortAsc
};