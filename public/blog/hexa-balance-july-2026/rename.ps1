$d = 'c:\Users\USER\Desktop\maple-colosseum\maple-hub\public\blog\hexa-balance-july-2026\'
$files = Get-ChildItem $d -Filter 'w_*'
$map = @{}
foreach ($f in $files) {
    $name = $f.Name
    if ($name -match 'darkknight|다크나이트') { $idx = if ($map.ContainsKey('dk')) { $map['dk']++ ; $map['dk'] } else { $map['dk'] = 1; 1 }; Copy-Item $f.FullName ($d + "darkknight$idx.png") -Force }
    elseif ($name -match '아란') { $idx = if ($map.ContainsKey('aran')) { $map['aran']++ ; $map['aran'] } else { $map['aran'] = 1; 1 }; Copy-Item $f.FullName ($d + "aran$idx.png") -Force }
    elseif ($name -match '아델') { $idx = if ($map.ContainsKey('adele')) { $map['adele']++ ; $map['adele'] } else { $map['adele'] = 1; 1 }; Copy-Item $f.FullName ($d + "adele$idx.png") -Force }
    elseif ($name -match '카이저') { Copy-Item $f.FullName ($d + 'kaiser1.png') -Force }
    elseif ($name -match '데몬_어벤져') { Copy-Item $f.FullName ($d + 'demonavenger1.png') -Force }
    elseif ($name -match '렌\(') { Copy-Item $f.FullName ($d + 'len1.png') -Force }
    elseif ($name -match '5차.마법사') { Copy-Item $f.FullName ($d + 'arcmage_fd1.png') -Force }
    elseif ($name -match '비숍') { Copy-Item $f.FullName ($d + 'bishop1.png') -Force }
    elseif ($name -match '에반') { Copy-Item $f.FullName ($d + 'evan1.png') -Force }
    elseif ($name -match '키네시스') { Copy-Item $f.FullName ($d + 'kinesis1.png') -Force }
    elseif ($name -match '일리움') { Copy-Item $f.FullName ($d + 'illium1.png') -Force }
    elseif ($name -match '라라') { Copy-Item $f.FullName ($d + 'lara1.png') -Force }
    elseif ($name -match '레테') { $idx = if ($map.ContainsKey('lethe')) { $map['lethe']++ ; $map['lethe'] } else { $map['lethe'] = 1; 1 }; Copy-Item $f.FullName ($d + "lethe$idx.png") -Force }
    elseif ($name -match '신궁') { Copy-Item $f.FullName ($d + 'marksman1.png') -Force }
    elseif ($name -match '패스파인더') { $idx = if ($map.ContainsKey('pf')) { $map['pf']++ ; $map['pf'] } else { $map['pf'] = 1; 1 }; Copy-Item $f.FullName ($d + "pathfinder$idx.png") -Force }
    elseif ($name -match '5차.궁수') { Copy-Item $f.FullName ($d + 'windbreaker1.png') -Force }
    elseif ($name -match '메르세데스') { $idx = if ($map.ContainsKey('merc')) { $map['merc']++ ; $map['merc'] } else { $map['merc'] = 1; 1 }; Copy-Item $f.FullName ($d + "mercedes$idx.png") -Force }
    elseif ($name -match '카인') { $idx = if ($map.ContainsKey('kain')) { $map['kain']++ ; $map['kain'] } else { $map['kain'] = 1; 1 }; Copy-Item $f.FullName ($d + "kain$idx.png") -Force }
    elseif ($name -match '섀도어') { $idx = if ($map.ContainsKey('sha')) { $map['sha']++ ; $map['sha'] } else { $map['sha'] = 1; 1 }; Copy-Item $f.FullName ($d + "shadower$idx.png") -Force }
    elseif ($name -match '듀얼블레이더') { Copy-Item $f.FullName ($d + 'dualblade1.png') -Force }
    elseif ($name -match '칼리') { Copy-Item $f.FullName ($d + 'kali1.png') -Force }
    elseif ($name -match '제논') { Copy-Item $f.FullName ($d + 'xenon1.png') -Force }
    elseif ($name -match '바이퍼') { Copy-Item $f.FullName ($d + 'viper1.png') -Force }
    elseif ($name -match '스트라이커') { Copy-Item $f.FullName ($d + 'striker1.png') -Force }
    elseif ($name -match '메카닉') { Copy-Item $f.FullName ($d + 'mechanic1.png') -Force }
    elseif ($name -match '아크\(') { Copy-Item $f.FullName ($d + 'ark1.png') -Force }
    elseif ($name -match '엔젤릭버스터') { Copy-Item $f.FullName ($d + 'angelic1.png') -Force }
    elseif ($name -match '캐논마스터') { $idx = if ($map.ContainsKey('can')) { $map['can']++ ; $map['can'] } else { $map['can'] = 1; 1 }; Copy-Item $f.FullName ($d + "cannonshooter$idx.png") -Force }
}
Write-Host 'Rename complete'
