const datFoto = await fetch("./troops/data.json");


function uraikanLink(datas, ){
    let dataIni = datas.replace("https://link.clashofclans.com/id?action=CopyArmy&army=", "").replace("i", "-i").replace("u", "-u").replace("s", "-s").replace("d", "-d");

    let dataIni2 = "{"+datas.replace("https://link.clashofclans.com/id?action=CopyArmy&army=", "").replace("h", "'h':['").replace("i", "'],'i':['").replace("u", "'],'u':['").replace("d", "'],'d':['").replace("s", "'],'s':['").replaceAll("-", "','")+"']}";
    let dataFinal = dataIni2.replace(/'/g, '"');

    let dataHuruf = JSON.parse(dataFinal);
    


    let pasukan = "";

    let hero = "";
    dataHuruf.h.forEach(ini => {
        let uni = ini.replace("p", ",").replace("_", ",").replace("e", ",").split(",");

        hero += `
            <div class="kotak">
                <div class="foto">
                    <img src="./troops/hero/${uni[0]}.jpg" alt="">
                </div>
            </div>
            <div class="kotak">
                <div class="jumlah">
                    <img src="./troops/hero/pets/${uni[1]}.jpg" alt="">
                </div>
                <div class="jumlah2">
                    <img src="./troops/hero/gear/${uni[uni.length-2]}.jpg" alt="">
                </div>
                <div class="jumlah3">
                    <img src="./troops/hero/gear/${uni[uni.length-1]}.jpg" alt="">
                </div>
            </div>
        `
    })
    
    let units = "";
    dataHuruf.u.forEach(ini => {
        let uni = ini.split("x");
        units += `
            <div class="kotak">
                <div class="foto">
                    <img src="./troops/units/${uni[1]}.jpg" alt="">
                    <div class="debugAngka">
                        ${uni[1]}
                    </div>
                </div>
                <div class="jumlah">
                    ${uni[0]}
                </div>
            </div>
        `
    })

    let spell = "";
    dataHuruf.s.forEach(ini => {
        let uni = ini.split("x");
        spell += `
            <div class="kotak">
                <div class="foto">
                    <img src="./troops/spell/${uni[1]}.jpg" alt="">
                    <div class="debugAngka">
                        ${uni[1]}
                    </div>
                </div>
                <div class="jumlah">
                    ${uni[0]}
                </div>
            </div>
        `
    })


    let clancastle = "";
    dataHuruf.i.forEach(ini => {
        let uni = ini.split("x");
        clancastle += `
            <div class="kotak">
                <div class="foto">
                    <img src="./troops/units/${uni[1]}.jpg" alt="">
                    <div class="debugAngka">
                        ${uni[1]}
                    </div>
                </div>
                <div class="jumlah">
                    ${uni[0]}
                </div>
            </div>
        `
    })
    dataHuruf.d.forEach(ini => {
        let uni = ini.split("x");
        clancastle += `
            <div class="kotak">
                <div class="foto">
                    <img src="./troops/spell/${uni[1]}.jpg" alt="">
                    
                    <div class="debugAngka">
                        ${uni[1]}
                    </div>
                </div>
                <div class="jumlah">
                    ${uni[0]}
                </div>
            </div>
        `
    })

    pasukan += `
        <div class="pasukan">
            </h3>
            <div class="hero">
                ${hero}
            </div>
            <div class="units">
                ${units}
            </div>
            <div class="spell">
                ${spell}
                <div style="height:2.5rem; 
                    right: .5rem; 
                    padding: .4rem;">
                    <img src="./media/images/spell.png" alt="" style="height:100%; filter:invert(30%);">
                </div>
            </div>
            <div class="clancastle">
                ${clancastle}
            </div>
        </div>
    `    

    return pasukan;
}

export function buatKartuUnit(dataUnit) {
    let pasukan = uraikanLink(dataUnit.link);
    return `
        <div class="push">
            <div class="top">
                <div class="kiri">
                    <h4>${dataUnit.name}</h4>
                    <small>townhall : ${dataUnit.th}</small>

                    </div>
                    <div class="kanan">
                    <div class="copy" linkSalin="${dataUnit.link}">
                        <img src="./media/icon/copy-link-icon.svg" alt="" class="png-icon">
                    </div>
                    <a class="open" href="${dataUnit.link}" target="_blank">
                    <img src="./media/icon/open-external-link-icon.svg" alt="" class="png-icon">
                    </a>
                    </div>
                    
                    </div>
            ${pasukan}
            <div class="bottom">
                <small>from: ${dataUnit.uploader.nama}</small>
                <small>${dataUnit.date}</small>
            </div>
            
        </div>
    `;
}