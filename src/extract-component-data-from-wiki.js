var os = [];

extract("ComponentListCommon", "common");
extract("ComponentListRare", "rare");

JSON.stringify(os);

function extract(tableId, tier) {
    var col_img = 0,
        col_name = 1,
        col_type = 2,
        col_stats = 3;
    var cs = document.getElementById(tableId).firstElementChild.firstElementChild.getElementsByTagName("TR");

    for (i = 1; i < cs.length; i++) { 
        var ds = cs[i].getElementsByTagName("TD");

        var img_src = ds[col_img].firstElementChild.firstElementChild.src,
            img_alt = ds[col_img].firstElementChild.firstElementChild.alt,
            img_key = ds[col_img].firstElementChild.firstElementChild.getAttribute("data-image-key"),
            img_name = ds[col_img].firstElementChild.firstElementChild.getAttribute("data-image-name");

        var cmp_name_level_pair = ds[col_name].innerText.replace("(","").replace(")","").split("\n"),
            cmp_name = cmp_name_level_pair[0].trim(),
            cmp_level = cmp_name_level_pair[1].trim();

        var itemTypes = ds[col_type].getElementsByTagName("a"),
            cmp_used_with = [];

        for (j = 0; j < itemTypes.length; j++) {
            cmp_used_with.push(itemTypes[j].innerText.trim());
        }

        var stats = ds[col_stats].childNodes,
            cmp_stats = [];
            cmp_skill = false;

        for (j = 0; j < stats.length; j++) {
            var n = stats.item(j);

            if (n.nodeType === 3) {
                var t = n.textContent.trim();
                if (t !== "") {
                    cmp_stats.push(t);
                }            
            } else if (n.nodeType === 1 && n.tagName === "A") {
                cmp_skill = { name: n.text
                            , url: n.href };
            }
        }

        var o = { img_src: img_src
                , img_alt: img_alt
                , img_key: img_key 
                , img_name: img_name
                , cmp_name: cmp_name
                , cmp_level: cmp_level
                , cmp_tier: tier
                , cmp_used_with: cmp_used_with
                , cmp_stats: cmp_stats
                , cmp_skill: cmp_skill };

        os.push(o);
    }
}