select a.id_penduduk, a.anggota_dari, a.nama 
from tpenduduk a 
left join tpenduduk b ON a.anggota_dari = b.id_penduduk group by a.id_penduduk, a.anggota_dari 