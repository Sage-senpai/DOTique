import { StorageDescriptor, PlainDescriptor, TxDescriptor, RuntimeDescriptor, Enum, ApisFromDef, QueryFromPalletsDef, TxFromPalletsDef, EventsFromPalletsDef, ErrorsFromPalletsDef, ConstFromPalletsDef, ViewFnsFromPalletsDef, SS58String, FixedSizeBinary, Binary, FixedSizeArray } from "polkadot-api";
import { I5sesotjlssv2d, Iffmde3ekjedi9, I4mddgoa69c0a2, Idk6dpftml1om4, I95g6i7ilua7lq, Ieniouoqkq4icf, Phase, Ibgl04rn6nbfm6, I4q39t5hn830vp, I1v7jbnil3tjns, I8jgj1nhcr2dg8, Ifn6q3equiq9qi, Ia3sb0vgvovhtg, Iav8k1edbj86k7, Itom7fk49o0c9, I4i91h98n3cv1b, I4iumukclgj8ej, Iqnbvitf7a7l3, I48i407regf59r, I6r5cbv8ttrb09, PreimageOldRequestStatus, PreimageRequestStatus, I4pact7n2e9a0i, I6ctis90lunpu6, I56u24ncejr5kt, I9jd27rnpm8ttv, I7rt63b9d5k7p8, I4b3lhc1ach2vm, I1q8tnt1cluu5j, I8ds64oj6581v0, Ia7pdug7cdsg8g, Ia70t7cmeetrp0, I2l1ctuihi2mfd, TransactionPaymentReleases, Ifble4juuml5ig, Version, I2phecamkn3pej, ClaimsStatementKind, Ia2lhg7l2hilo3, Ifi4da1gej1fri, Ifvgo9568rpmqc, I82jm9g7pufuel, Ic5m5lp1oioo8r, I6cs1itejju2vv, Icgljjb6j82uhn, Ib77b0fp1a6mjr, I5g2vv0ckl2m8b, Ifup3lg9ro8a0f, I5qfubnuvrnqn6, I8t3u2dv73ahbd, I7vlvrrl2pnbgk, Ie0rpl5bahldfk, XcmPalletVersionMigrationStage, I7e5oaj2qi4kl1, Ie849h3gncgvok, Iat62vud7hlod2, Ict03eedr8de9s, Ibkm2gcn4pji30, XcmVersionedLocation, I7f4alf2hnuu8s, Idh2ug6ou4a8og, Iejeo53sea6n4q, I53esa2ms463bk, Ib4jhb8tt3uung, Ibqjcgmcid3dll, Iag146hmjgqfgj, I8uo3fpd3bcc6f, Idg5pmtj0nu2j2, I9p9lq3rej5bhc, Iff9heri56m1mb, I3qklfjubrljqh, Iag3f1hum3p4c8, I7svnfko10tq2e, I4s6jkha20aoh0, I2brm5b9jij1st, I78s05f59eoi8b, Ianufjuplcj6u4, Id32h28hjj1tch, I6ouflveob4eli, I2mv9dvsaj3kcr, I7781vnk0rm9eq, Ie2iqtdb0stqo1, I5irutptk105do, Ic9nev69d8grv1, I18m6a0sc4k7s9, Ic9iokm15iigt6, I35m96p3u4vl0p, Iapmji0h53pmkn, Idrr42svup341f, I4ugih6gb4fmug, Idac0t49lnd4ls, I72ndo6phms8ik, If9iqq7i64mur8, I4v5g6i7bmt06o, I84bhscllvv07n, If21n82i0516em, Iegmj7n48sc3am, I2l0beelkqtf0a, ConvictionVotingVoteVoting, If9jidduiuq7vv, I41nj8f5r4c9e7, Ict0fmb8krq1lk, Ibofbvvaehln4e, I2q3ri6itcjj5u, If354jrdedj0pj, Ib17t3992hb64n, I215mkl885p4da, I69tqqtpr9n8ie, StakingRewardDestination, I9o7ssi9vmhmgr, Ic3m9d6tdl6gi2, Ib3j7gb0jgs38u, I6flrronqs3l6n, I97fulj5h3ik95, Ia8896dq44k9m4, Iff9p3c7k6pfoi, StakingForcing, I7oqom2n34q7u8, I921dks5d4ov9t, Idm2c96td6cqkk, Iam8h8p165t5uu, I205qrookusi3d, I4ojmnsk1dchql, I70u6ma6po0va2, I2julfd57mkmap, Idphjddn2h69vc, Idhh9vuu2bderg, If6qa32dj75gu1, I7oo2mprv1qd1s, NominationPoolsClaimPermission, Ic5t26f9cp3tvk, I39k39h6vu4hbq, I542q009qbgt8k, I4e5ujckjq61g8, I3fgbanmq2lnk2, I7d4qtdlascfk8, I9cpogojpnsq8h, I4bboqsv44evel, I8je4hjun1hc3g, I3mj0igdqvh474, I8s6n43okuj2b1, I29575k8s6asco, I3rfe446il0rb7, I1nvcsqg39g26j, Iefkd2klketjfh, I6o6dmud53u1fj, I95l2k9b1re95f, Ifb0kt7cu5a61c, Ifgh9ocbdogt8l, I1d6j3815ii0ua, I2fbmombro6ugg, In7a38730s6qs, If15el53dd76v9, I9s0ave7t0vnrk, I4fo08joqmcqnm, XcmV5Junctions, Iasb8k6ash5mjn, Ibafpkl9hhno69, I35p85j063s0il, Iafqnechp3omqg, I8ofcg5rbj0g2c, I4adgbll7gku4i, I6pjjpfvhvcfru, I9pj91mj79qekl, I39uah9nss64h9, Ik64dknsq7k08, I3m5sq54sjdlso, Ib51vk42m1po4n, Ial23jn8hp0aen, Ifpj261e8s63m3, Idcr6u6361oad9, I82nfqfkd48n10, I1jm8m1rh9e20v, I3o5j3bli1pd8e, I4t62p70pnntsd, I5n4sebgkfr760, I7jmko1jaasivn, Ifs1i5fk9cqvr6, Ic9r6veqrbd54j, Ic096s1vvk47qc, Ieg3fd8p4pkt10, I8kg5ll427kfqq, I467333262q1l9, I6usrkf9la6hg2, I4ktuaksf5i1gk, I9bqtpv2ii35mp, I9j7pagd6d4bda, I2h9pmio37r7fb, Ibmr18suc9ikh9, I9iq22t0burs89, I5u8olqbbvfnvf, I5utcetro501ir, Id9uqtigc0il3v, Iaa2o6cgjdpdn5, Iam6hrl7ptd85l, Ict9ivhr2c5hv0, I8t4vv03357lk9, I6uag8j5aql8q, Isq3k9rh2c0l4, I1dqiovk0tpoah, I1ntko0oih7v1a, I2tf5qmg09624f, Ifccifqltb5obi, Iadtsfv699cq8b, Ialpmgmhr3gk5r, I4cbvqmqadhrea, I3sdol54kg5jaq, I8fougodaj6di6, I81vt5eq60l4b6, I3vh014cqgmrfd, Ia5cotcvi888ln, I21jsa919m88fd, Iegif7m3upfe1k, I9kt8c221c83ln, Ic76kfh5ebqkpl, Icscpmubum33bq, I21d2olof7eb60, Ibgm4rnf22lal1, Ie68np0vpihith, I9bnv6lu0crf1q, Iauhjqifrdklq7, Ie1uso9m8rt5cf, Idlampfle3vh6q, I40pqum1mu8qg3, I1r4c2ghbtvjuc, I9i6b1362umn1t, Iel0ml15497i7b, Icp5j0naoi9qh2, I3su49r978d1jv, Id4rd98rpm3lsm, I7keitt825v44l, I8m94rr7prdld2, I5d97jj7jsh708, I1e1rtve4qeedc, I2tarfpsmmt2h4, Ideaemvoneh309, I3d9o9d7epp66v, I6lqh1vgb4mcja, I5heniluodu9s7, I1f5npkhqt8edf, Ick1e7hpegm7nq, Ickilojujmtbr4, I2eb501t8s6hsq, Ianmuoljk2sk1u, If2e5kdjq9qh3s, I666bl2fqjkejo, I6o1er683vod1j, I5bq561t4gpfva, Ic357tcepuvo5c, I2rnoam876ruhj, Ic5b47dj4coa3r, Ib3qnc19gu633c, Ifira6u9hi7cu1, I72tqocvdoqfff, I2i27f3sfmvc05, I1nlrtd1epki2d, I3abtumcmempjs, Id81m8flopt8ha, I8hff7chabggkd, I49i39mtj1ivbs, Ifkr2kcak2vto1, I1ju6r8q0cs9jt, I4kpeq6j7cd5bu, I5na1ka76k6811, I59mhdb9omdqfa, I9vl5kpk0fpakt, I717jt61hu19b4, I7f7v8192r1lmq, If66ivi02f7256, I223jtcatlfkrc, I223jg78mng8hq, I4iiuiftkpq3fd, Ibra6533h92c0a, Ibgvkh96s68a66, If9vko7pv0231m, Iafkqus0ohh6l6, I6cu7obfo0rr0o, I736lv5q9m5bot, I1ap9tlenhr44l, Ib92t90p616grb, Ieipuujd6879do, Ie56eq9sg1rsoc, I5tvvgui05tn6e, Ibal0joadvdc2h, Iceq9fmmp9aeqv, I9viqhmdtuof5e, Ibqooroq6rr5kr, I6h88h8vba22v8, Ia9cd4jqb5eecb, I19jiel1ftbcce, I43aobns89nbkh, Iamd7rovec1hfb, I77ie723ncd4co, Ieebloeahma3ke, I4mbtpf4pu3rec, I1ahf3pvgsgbu, I9uapdn16emsti, Ie5i0q2glmr0md, I97qcg6i3l8gee, Ib5udrahak005b, I1jj31tn29ie3c, I5llu6o6a0go5i, Ic8b8561e6t9ie, I93r2effh7od84, I6afd7fllr8otc, Icrkms46uh8tpb, I78u60nqh0etah, I1lso3vlgherue, I26c8p47106toa, Iq82b3qvf20ne, Ic3j8ku6mbsms4, I3nvoqsi8f05ph, I3eoft5md071do, I923eug653ra0o, I7t2thek61ghou, I61tdrsafr1vf3, Ibsk5g3rhm45pu, Icfoe9q8d4vs8f, Ibrfmvjrg4trnb, Iedih7t34maii9, I4e902qbfel1f1, Ie4met0joi8sv0, I1t8vq6a06ohhu, Icvt3pdunbinm7, I9ui3n41balr2q, I89sl7btgl24g2, I3u6g26k9kn96u, If1invp94rsjms, Ie5nc19gtiv5sv, Iald3dgvt1hjkb, Iurrhahet4gno, I5tamv2nk8bj8o, I8apq8e7c7qcpp, Id1e31ij0c35fv, I3ip09dj7i1e8n, Ide34bfv94bvut, I6c7mabde89bp, I9sbpodgd8ilku, Ialnqi1f4kpb, Icnrv1mfbd3in1, Icm9m0qeemu66d, I79dicn2l2lfgs, Idnsr2pndm36h0, Ia1pvdcbhuqf8m, I8steo882k7qns, I4pa4q37gj6fua, I5f178ab6b89t3, I4nakhtbsk3c5s, I1olkr8c4fu16n, Icbio0e1f0034b, I8c0vkqjjipnuj, I1adbcfi5uc62r, Ibf6ucefn8fh49, Ia3okqcb5ev76q, I2a839vbf5817q, Ia9p5bg6p18r0i, I42bqh279uf7oa, I4p6v96cffstms, I90n6nnkpdahrh, I8mk5kjgn02hi8, Ieqvq91sbe02ko, I2gr10p66od9ch, I9mcq66cm3gibo, I9c4d50jrp7as1, Ifplevr9hp8jo3, I7psec5e6ghc64, I2psb0sladd863, I585tk8khua0gk, I3ut99di214ru2, Iemkp87d26vsbh, I4ahfrt5dscf6q, I2eip8tc75dpje, I564va64vtidbq, Ie5v6njpckr05b, I328av3j0bgmjb, I4tuqm9ato907i, Iagi89qt4h1lqg, I9dgmcnuamt5p8, Ifhs60omlhvt3, If34udpd5e57vi, I39t01nnod9109, Ie5vbnd9198quk, Ib1db5b4tm2bvc, I6k6jf8ncesuu3, I3qhk481i120pk, If1qr0kbbl298c, Idl3umm12u5pa, I5ont0141q9ss5, Ie6j49utvii126, I3v6ks33uluhnj, I3kiiim1cds68i, I4k60mkh2r6jjg, I70mou2rha6f5o, I9bur6p3ovq9mo, Ieg1oc56mamrl5, I2vu5vj7173ik9, I6galqkn58q3bl, I36uoc8t9liv80, Ibunghsg9qa7f7, I8qnouj2c0igph, Ic30e2k517a3ns, I47a2tsd2o2b1c, Ifc9k1s0e9nv8e, I4ihj26hl75e5p, I2dl8ekhm2t22h, I13us5e5h5645o, I931cottvong90, I7sujb8gfvuo7n, I1ors0vru14it3, I40s11r8nagn2g, I6bjj87fr5g9nl, I8cbluptqo8kbp, I81cc4plffa1dm, I3ihan8icf0c5k, I7ibh0fckqou49, Id9js0aucdivjk, I1vj3e1a62je3o, I6c1t14l6giceg, Ibqeqpelookfc7, I2ecpo819cust3, I9t5mbeod559uq, Ib8qhbmc61qu95, I6041egnb3am04, I7ej7mean6mih8, Iehi3mdadqmlp5, Id9gv8k0nmtfsc, I8k3rnvpeeh4hv, I5gu565o01hrbm, Ikkngcosp7bof, I22bm4d7re21j9, Ifioonc6ic974t, I72qfv83rhp4qr, I6jgv29n0phb3f, Ibcsrif5qnktv4, Ifsa6pjvc8t5vn, I64udjlb3l43q9, Ic0j854aucsgjh, I2gvrhmhj0moqc, I65qh88839sl2u, I43641g81fhl82, I9ibr6lih6j2ou, I935tki4voiobr, I4j0tlbg1g4hnk, Ifqt5asg9c3kl9, I9ii4hnjt4vc2j, Idjvt48j5plqih, I1gnvp8b47fj27, Iavl169paa5dbb, I835djvt3d32hf, I3ktkk856tqa2t, I57cq79pckivve, I8hv3mpjd5kvbj, I2tap0v9vk3h8h, Id55jp9esfn3s7, I3jftp5j4o8mk5, I4h3fd1igkg3mr, I5sgsmd01vj1nq, I6kmjpgojp035v, I7j4pupt7e71k2, Ia82mnkmeo2rhc, I4avs19249gp1r, Icbccs0ug47ilf, I855j4i3kr8ko1, Ifdanns64t6ntc, I6n2fpfj4igffj, Idd7hd99u0ho0n, Iafscmv8tjf0ou, I100l07kaehdlp, I6gnbnvip5vvdi, I1vpjc8661urf4, Ia3c82eadg79bj, Ienusoeb625ftq, Ibtsa3docbr9el, Icusb76knakdp5, Icv68aq8841478, Ic262ibdoec56a, Iflcfm9b6nlmdd, Ijrsf4mnp3eka, Id5fm4p8lj5qgi, I8tjvj9uq4b7hi, I3qt1hgg4djhgb, I4fooe9dun9o0t, Iph9c4rn81ub2, Ier2cke86dqbr2, Imhre0s2vm68p, Icjchvrijclvlv, Ih04jp733tqqa, Ievr89968437gm, Ie3hcrrq6r18fs, I6v8sm60vvkmk7, I1qmtmbe5so8r3, Ih99m6ehpcar7, Idgorhsbgdq2ap, I9ubb2kqevnu6t, I2hq50pu2kdjpo, I9acqruh7322g2, I137t1cld92pod, I61d51nv4cou88, If8u5kl4h8070m, Ibmuil6p3vl83l, I7lul91g50ae87, Icl7nl1rfeog3i, Iasr6pj6shs0fl, I2uqmls7kcdnii, Idg69klialbkb8, I7r6b7145022pp, I30pg328m00nr3, Icmrn7bogp28cs, I7m9b5plj4h5ot, I9onhk772nfs4f, I3l6bnksrmt56r, Idh09k0l2pmdcg, I7uoiphbm0tj4r, I512p1n7qt24l8, I6s1nbislhk619, I3gghqnh2mj0is, I6iv852roh6t3h, I9oc2o6itbiopq, Ibslgga81p36aa, Ie8hpsm3jhsvo3, I1rvj4ubaplho0, Ia3uu7lqcc1q1i, I7crucfnonitkn, I7tmrp94r9sq4n, Idh1o9u76dvv56, Iekcc69070n105, I55u9magsq616l, Ieok3k088heoj6, Iep27ialq4a7o7, Iasu5jvoqr43mv, I3t82p779p3mq1, I5qolde99acmd1, I8gtde5abn1g9a, Ie30u0oafsgjvf, I3c89s6g2o36ch, I2ur0oeqg495j8, I602733ahhj29u, I1bhd210c3phjj, Ia1u3jll6a06ae, Ic9g5lvl9iddc5, I88ff3u4dpivk, I33cp947glv1ks, Ic9om1gmmqu7rq, I5hfov2b68ppb6, Ibthhb2m9vneds, Iaitn5bqfacj7k, If4ebvclj2ugvi, Ia5le7udkgbaq9, Ieduc1e6frq8rb, I9h6gbtabovtm4, Ifnsa0dkkpf465, I65dtqr2egjbc3, Ibqj3vg5s5lk0c, I6l73u513p8rna, Iefqmt2htu1dlu, If8bgtgqrchjtu, Idusmq77988cmt, I9gqanbbbe917p, Id1m1230297f7a, Ifvb1p5munhhv4, I46h83ilqeed3g, Icahse3uoi76n7, I75sj3uv7gnemk, I5fjkvcb5vr6nb, I2gr1toekv86b9, I2v2ikqt2trp52, If3057hi1g5qlo, Iaii5qf41d5n3d, Ico8bnjc6taa27, I78i1bvlonei69, I9i1f9mrso1hmf, I9ksla2si91s56, Id9j7b85otvjru, Iaihk9pek2ajl9, Id9av23h47ufb2, Ib4kpnijas4jqp, I2vnu5k0u1i65h, Icqe266pmnr25o, I5hoiph0lqphp, I5k7oropl9ofc7, I48vagp1omigob, Ib5tst4ppem1g6, Ibn64edsrg3737, I83r9d02dh47j9, I3jnhifvaeuama, I8n1gia0lo42ok, I6gb0o7lqjfdjq, Idh36v6iegkmpq, I27hnueutmchbe, Iectm2em66uhao, I7q57goff3j72h, Ibe49veu9i9nro, I1rnkmiu7usb82, I1q546n7mmm8nk, If7i5aoh4lk0a1, If9prqbk25189q, Icugn66dlnp8rd, I1bfrt15apsnp, Id3old33tr9erj, I8iksqi3eani0a, I16enopmju1p0q, I43kq8qudg7pq9, I76riseemre533, I38bmcrmh852rk, I4hcillge8de5f, I6pl54js63fnua, Iek7v4hrgnq6iv, I2na29tt2afp0j, I9qfchhljqsjjl, I7kij8p9kchdjo, I229ijht536qdu, I62nte77gksm0f, I9cg2delv92pvq, Ilhp45uime5tp, I4f1hv034jf1dt, Ic21q4q8m0uiak, Id9idaj83175f9, Ie1semicfuv5uu, If25fjs9o37co1, I70sc1pdo8vtos, Ibck5e4jpm96l8, I60p8l86a8cm59, I3m3sk2lgcabvp, I5pf572duh4oeg, Idrugh2blv81ia, Iagqcb06kbevb1, Iec8defeh924b6, I1au3fq4n84nv3, Iejaj7m7qka9tr, Idnak900lt5lm8, Ifk8eme5o7mukf, Iau4cgm6ih61cf, Ith132hqfb27q, Ic19as7nbst738, I54umskavgc9du, I2ip7o9e2tc5sf, I5egvk6hadac5h, I1td4upnup9gqv, I3m3s3nqk2k59p, I4rl33s8t7uju2, Icgsl781ka0jnq, I9s54l74mrft0k, Ia5ob51vsq2d0j, Ia082gmtdk04o2, I1ti389kf8t6oi, If4nnre373amul, I55kbor0ocqk6h, Idsj9cg7j96kpc, Ido4u9drncfaml, Ie8c7ctks8ur2p, I6c6fpqmnqijqd, I6mik29s5073td, I2m0sqmb75cnpb, I49agc5b62mehu, Iatq9jda4hq6pg, I2g87evcjlgmqi, I93ajn7brqs8df, Ib2q8vnsr19t9b, If6q1q7op2gvqf, I37454vatvmm1l, Iblau1qa7u7fet, Id2aanom2jncf1, I1b9s29roqhg41, I9kd1anrch3gtm, I34ma0kjnleq33, I44bc4bblti9at, Icr28nsmo3thmu, I1csu4ejte2mno, I9lrippm0l6t0c, Icsknfl0f6r973, I24s17v9t73msr, I5rtkmhm2dng4u, I4g1444e4lrvko, I99mhtl0011mj8, I2sdq8bqulpaf1, I6qgvbdj59q82d, I8a7s0gpbv2c0i, I4udn5ndu0dko2, Ifpff50mo8ndh6, I3f9qerj1fhlkp, I7j6vt4ra6khhv, Iaddpgr0qkt1u0, I5r8t4iaend96p, Ie2db4l6126rkt, Ictkqqlhdjt761, Ic7pvaiu1ha8ek, I796241kr7j1j0, Iba6ec6u9n2dc1, Iaqet9jc3ihboe, Ic952bubvq4k7d, I2v50gu3s1aqk6, Iabpgqcjikia83, Ib13rjfu0u56k0, If7uv525tdvv7a, I2an1fs2eiebjp, TransactionValidityTransactionSource, I9ask1o4tfvcvs, Icerf8h8pdu8ss, I6spmpef2c7svf, Iei2mvq0mjvt81, Iftvbctbo05fu4, XcmVersionedXcm, Ic0c3req3mlc1l, XcmVersionedAssetId, I7ocn4njqde3v5, Iek7ha36da9mf5, I9mrsespe1jciv, I3f0ffdeaqo2ss, I6vpoc9mh7av70, Ieh6nis3hdbtgi, XcmVersionedAsset, Icujp6hmv35vbn, I4tjame31218k9, I5gif8vomct5i8, I8fk5filgollou, Ic1d4u2opv3fst, Ie9sr1iqcg3cgm, I1mqgk2tmnn9i2, I6lr8sctk0bi4e, I5vv5n03oo8gas, I7i1mgmuehechs } from "./common-types";
type AnonymousEnum<T extends {}> = T & {
    __anonymous: true;
};
type MyTuple<T> = [T, ...T[]];
type SeparateUndefined<T> = undefined extends T ? undefined | Exclude<T, undefined> : T;
type Anonymize<T> = SeparateUndefined<T extends FixedSizeBinary<infer L> ? number extends L ? Binary : FixedSizeBinary<L> : T extends string | number | bigint | boolean | void | undefined | null | symbol | Uint8Array | Enum<any> ? T : T extends AnonymousEnum<infer V> ? Enum<V> : T extends MyTuple<any> ? {
    [K in keyof T]: T[K];
} : T extends [] ? [] : T extends FixedSizeArray<infer L, infer T> ? number extends L ? Array<T> : FixedSizeArray<L, T> : {
    [K in keyof T & string]: T[K];
}>;
type IStorage = {
    System: {
        /**
         * The full account information for a particular account ID.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I5sesotjlssv2d>, false, never>;
        /**
         * Total extrinsics count for the current block.
         */
        ExtrinsicCount: StorageDescriptor<[], number, true, never>;
        /**
         * Whether all inherents have been applied.
         */
        InherentsApplied: StorageDescriptor<[], boolean, false, never>;
        /**
         * The current weight for the block.
         */
        BlockWeight: StorageDescriptor<[], Anonymize<Iffmde3ekjedi9>, false, never>;
        /**
         * Total length (in bytes) for all extrinsics put together, for the current block.
         */
        AllExtrinsicsLen: StorageDescriptor<[], number, true, never>;
        /**
         * Map of block numbers to block hashes.
         */
        BlockHash: StorageDescriptor<[Key: number], FixedSizeBinary<32>, false, never>;
        /**
         * Extrinsics data for the current block (maps an extrinsic's index to its data).
         */
        ExtrinsicData: StorageDescriptor<[Key: number], Binary, false, never>;
        /**
         * The current block number being processed. Set by `execute_block`.
         */
        Number: StorageDescriptor<[], number, false, never>;
        /**
         * Hash of the previous block.
         */
        ParentHash: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
        /**
         * Digest of the current block, also part of the block header.
         */
        Digest: StorageDescriptor<[], Anonymize<I4mddgoa69c0a2>, false, never>;
        /**
         * Events deposited for the current block.
         *
         * NOTE: The item is unbound and should therefore never be read on chain.
         * It could otherwise inflate the PoV size of a block.
         *
         * Events have a large in-memory size. Box the events to not go out-of-memory
         * just in case someone still reads them from within the runtime.
         */
        Events: StorageDescriptor<[], Anonymize<Idk6dpftml1om4>, false, never>;
        /**
         * The number of events in the `Events<T>` list.
         */
        EventCount: StorageDescriptor<[], number, false, never>;
        /**
         * Mapping between a topic (represented by T::Hash) and a vector of indexes
         * of events in the `<Events<T>>` list.
         *
         * All topic vectors have deterministic storage locations depending on the topic. This
         * allows light-clients to leverage the changes trie storage tracking mechanism and
         * in case of changes fetch the list of events of interest.
         *
         * The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
         * the `EventIndex` then in case if the topic has the same contents on the next block
         * no notification will be triggered thus the event might be lost.
         */
        EventTopics: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I95g6i7ilua7lq>, false, never>;
        /**
         * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
         */
        LastRuntimeUpgrade: StorageDescriptor<[], Anonymize<Ieniouoqkq4icf>, true, never>;
        /**
         * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
         */
        UpgradedToU32RefCount: StorageDescriptor<[], boolean, false, never>;
        /**
         * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
         * (default) if not.
         */
        UpgradedToTripleRefCount: StorageDescriptor<[], boolean, false, never>;
        /**
         * The execution phase of the block.
         */
        ExecutionPhase: StorageDescriptor<[], Phase, true, never>;
        /**
         * `Some` if a code upgrade has been authorized.
         */
        AuthorizedUpgrade: StorageDescriptor<[], Anonymize<Ibgl04rn6nbfm6>, true, never>;
        /**
         * The weight reclaimed for the extrinsic.
         *
         * This information is available until the end of the extrinsic execution.
         * More precisely this information is removed in `note_applied_extrinsic`.
         *
         * Logic doing some post dispatch weight reduction must update this storage to avoid duplicate
         * reduction.
         */
        ExtrinsicWeightReclaimed: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, false, never>;
    };
    ParachainSystem: {
        /**
         * Latest included block descendants the runtime accepted. In other words, these are
         * ancestors of the currently executing block which have not been included in the observed
         * relay-chain state.
         *
         * The segment length is limited by the capacity returned from the [`ConsensusHook`] configured
         * in the pallet.
         */
        UnincludedSegment: StorageDescriptor<[], Anonymize<I1v7jbnil3tjns>, false, never>;
        /**
         * Storage field that keeps track of bandwidth used by the unincluded segment along with the
         * latest HRMP watermark. Used for limiting the acceptance of new blocks with
         * respect to relay chain constraints.
         */
        AggregatedUnincludedSegment: StorageDescriptor<[], Anonymize<I8jgj1nhcr2dg8>, true, never>;
        /**
         * In case of a scheduled upgrade, this storage field contains the validation code to be
         * applied.
         *
         * As soon as the relay chain gives us the go-ahead signal, we will overwrite the
         * [`:code`][sp_core::storage::well_known_keys::CODE] which will result the next block process
         * with the new validation code. This concludes the upgrade process.
         */
        PendingValidationCode: StorageDescriptor<[], Binary, false, never>;
        /**
         * Validation code that is set by the parachain and is to be communicated to collator and
         * consequently the relay-chain.
         *
         * This will be cleared in `on_initialize` of each new block if no other pallet already set
         * the value.
         */
        NewValidationCode: StorageDescriptor<[], Binary, true, never>;
        /**
         * The [`PersistedValidationData`] set for this block.
         * This value is expected to be set only once per block and it's never stored
         * in the trie.
         */
        ValidationData: StorageDescriptor<[], Anonymize<Ifn6q3equiq9qi>, true, never>;
        /**
         * Were the validation data set to notify the relay chain?
         */
        DidSetValidationCode: StorageDescriptor<[], boolean, false, never>;
        /**
         * The relay chain block number associated with the last parachain block.
         *
         * This is updated in `on_finalize`.
         */
        LastRelayChainBlockNumber: StorageDescriptor<[], number, false, never>;
        /**
         * An option which indicates if the relay-chain restricts signalling a validation code upgrade.
         * In other words, if this is `Some` and [`NewValidationCode`] is `Some` then the produced
         * candidate will be invalid.
         *
         * This storage item is a mirror of the corresponding value for the current parachain from the
         * relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
         * set after the inherent.
         */
        UpgradeRestrictionSignal: StorageDescriptor<[], Anonymize<Ia3sb0vgvovhtg>, false, never>;
        /**
         * Optional upgrade go-ahead signal from the relay-chain.
         *
         * This storage item is a mirror of the corresponding value for the current parachain from the
         * relay-chain. This value is ephemeral which means it doesn't hit the storage. This value is
         * set after the inherent.
         */
        UpgradeGoAhead: StorageDescriptor<[], Anonymize<Iav8k1edbj86k7>, false, never>;
        /**
         * The state proof for the last relay parent block.
         *
         * This field is meant to be updated each block with the validation data inherent. Therefore,
         * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
         *
         * This data is also absent from the genesis.
         */
        RelayStateProof: StorageDescriptor<[], Anonymize<Itom7fk49o0c9>, true, never>;
        /**
         * The snapshot of some state related to messaging relevant to the current parachain as per
         * the relay parent.
         *
         * This field is meant to be updated each block with the validation data inherent. Therefore,
         * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
         *
         * This data is also absent from the genesis.
         */
        RelevantMessagingState: StorageDescriptor<[], Anonymize<I4i91h98n3cv1b>, true, never>;
        /**
         * The parachain host configuration that was obtained from the relay parent.
         *
         * This field is meant to be updated each block with the validation data inherent. Therefore,
         * before processing of the inherent, e.g. in `on_initialize` this data may be stale.
         *
         * This data is also absent from the genesis.
         */
        HostConfiguration: StorageDescriptor<[], Anonymize<I4iumukclgj8ej>, true, never>;
        /**
         * The last downward message queue chain head we have observed.
         *
         * This value is loaded before and saved after processing inbound downward messages carried
         * by the system inherent.
         */
        LastDmqMqcHead: StorageDescriptor<[], FixedSizeBinary<32>, false, never>;
        /**
         * The message queue chain heads we have observed per each channel incoming channel.
         *
         * This value is loaded before and saved after processing inbound downward messages carried
         * by the system inherent.
         */
        LastHrmpMqcHeads: StorageDescriptor<[], Anonymize<Iqnbvitf7a7l3>, false, never>;
        /**
         * Number of downward messages processed in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        ProcessedDownwardMessages: StorageDescriptor<[], number, false, never>;
        /**
         * The last processed downward message.
         *
         * We need to keep track of this to filter the messages that have been already processed.
         */
        LastProcessedDownwardMessage: StorageDescriptor<[], Anonymize<I48i407regf59r>, true, never>;
        /**
         * HRMP watermark that was set in a block.
         */
        HrmpWatermark: StorageDescriptor<[], number, false, never>;
        /**
         * The last processed HRMP message.
         *
         * We need to keep track of this to filter the messages that have been already processed.
         */
        LastProcessedHrmpMessage: StorageDescriptor<[], Anonymize<I48i407regf59r>, true, never>;
        /**
         * HRMP messages that were sent in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        HrmpOutboundMessages: StorageDescriptor<[], Anonymize<I6r5cbv8ttrb09>, false, never>;
        /**
         * Upward messages that were sent in a block.
         *
         * This will be cleared in `on_initialize` of each new block.
         */
        UpwardMessages: StorageDescriptor<[], Anonymize<Itom7fk49o0c9>, false, never>;
        /**
         * Upward messages that are still pending and not yet send to the relay chain.
         */
        PendingUpwardMessages: StorageDescriptor<[], Anonymize<Itom7fk49o0c9>, false, never>;
        /**
         * The factor to multiply the base delivery fee by for UMP.
         */
        UpwardDeliveryFeeFactor: StorageDescriptor<[], bigint, false, never>;
        /**
         * The number of HRMP messages we observed in `on_initialize` and thus used that number for
         * announcing the weight of `on_initialize` and `on_finalize`.
         */
        AnnouncedHrmpMessagesPerCandidate: StorageDescriptor<[], number, false, never>;
        /**
         * The weight we reserve at the beginning of the block for processing XCMP messages. This
         * overrides the amount set in the Config trait.
         */
        ReservedXcmpWeightOverride: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, true, never>;
        /**
         * The weight we reserve at the beginning of the block for processing DMP messages. This
         * overrides the amount set in the Config trait.
         */
        ReservedDmpWeightOverride: StorageDescriptor<[], Anonymize<I4q39t5hn830vp>, true, never>;
        /**
         * A custom head data that should be returned as result of `validate_block`.
         *
         * See `Pallet::set_custom_validation_head_data` for more information.
         */
        CustomValidationHeadData: StorageDescriptor<[], Binary, true, never>;
    };
    Timestamp: {
        /**
         * The current time for the current block.
         */
        Now: StorageDescriptor<[], bigint, false, never>;
        /**
         * Whether the timestamp has been updated in this block.
         *
         * This value is updated to `true` upon successful submission of a timestamp by a node.
         * It is then checked at the end of each block execution in the `on_finalize` hook.
         */
        DidUpdate: StorageDescriptor<[], boolean, false, never>;
    };
    ParachainInfo: {
        /**
        
         */
        ParachainId: StorageDescriptor<[], number, false, never>;
    };
    Preimage: {
        /**
         * The request status of a given hash.
         */
        StatusFor: StorageDescriptor<[Key: FixedSizeBinary<32>], PreimageOldRequestStatus, true, never>;
        /**
         * The request status of a given hash.
         */
        RequestStatusFor: StorageDescriptor<[Key: FixedSizeBinary<32>], PreimageRequestStatus, true, never>;
        /**
        
         */
        PreimageFor: StorageDescriptor<[Key: Anonymize<I4pact7n2e9a0i>], Binary, true, never>;
    };
    Scheduler: {
        /**
         * Block number at which the agenda began incomplete execution.
         */
        IncompleteSince: StorageDescriptor<[], number, true, never>;
        /**
         * Items to be executed, indexed by the block number that they should be executed on.
         */
        Agenda: StorageDescriptor<[Key: number], Anonymize<I6ctis90lunpu6>, false, never>;
        /**
         * Retry configurations for items to be executed, indexed by task address.
         */
        Retries: StorageDescriptor<[Key: Anonymize<I9jd27rnpm8ttv>], Anonymize<I56u24ncejr5kt>, true, never>;
        /**
         * Lookup from a name to the block number and index of the task.
         *
         * For v3 -> v4 the previously unbounded identities are Blake2-256 hashed to form the v4
         * identities.
         */
        Lookup: StorageDescriptor<[Key: FixedSizeBinary<32>], Anonymize<I9jd27rnpm8ttv>, true, never>;
    };
    Parameters: {
        /**
         * Stored parameters.
         */
        Parameters: StorageDescriptor<[Key: Anonymize<I4b3lhc1ach2vm>], Anonymize<I7rt63b9d5k7p8>, true, never>;
    };
    Balances: {
        /**
         * The total units issued in the system.
         */
        TotalIssuance: StorageDescriptor<[], bigint, false, never>;
        /**
         * The total units of outstanding deactivated balance in the system.
         */
        InactiveIssuance: StorageDescriptor<[], bigint, false, never>;
        /**
         * The Balances pallet example of storing the balance of an account.
         *
         * # Example
         *
         * ```nocompile
         * impl pallet_balances::Config for Runtime {
         * type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
         * }
         * ```
         *
         * You can also store the balance of an account in the `System` pallet.
         *
         * # Example
         *
         * ```nocompile
         * impl pallet_balances::Config for Runtime {
         * type AccountStore = System
         * }
         * ```
         *
         * But this comes with tradeoffs, storing account balances in the system pallet stores
         * `frame_system` data alongside the account data contrary to storing account balances in the
         * `Balances` pallet, which uses a `StorageMap` to store balances data only.
         * NOTE: This is only used in the case that this pallet is used to store balances.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I1q8tnt1cluu5j>, false, never>;
        /**
         * Any liquidity locks on some account balances.
         * NOTE: Should only be accessed when setting, changing and freeing a lock.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Locks: StorageDescriptor<[Key: SS58String], Anonymize<I8ds64oj6581v0>, false, never>;
        /**
         * Named reserves on some account balances.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        Reserves: StorageDescriptor<[Key: SS58String], Anonymize<Ia7pdug7cdsg8g>, false, never>;
        /**
         * Holds on account balances.
         */
        Holds: StorageDescriptor<[Key: SS58String], Anonymize<Ia70t7cmeetrp0>, false, never>;
        /**
         * Freeze locks on account balances.
         */
        Freezes: StorageDescriptor<[Key: SS58String], Anonymize<I2l1ctuihi2mfd>, false, never>;
    };
    TransactionPayment: {
        /**
        
         */
        NextFeeMultiplier: StorageDescriptor<[], bigint, false, never>;
        /**
        
         */
        StorageVersion: StorageDescriptor<[], TransactionPaymentReleases, false, never>;
    };
    Vesting: {
        /**
         * Information regarding the vesting of a given account.
         */
        Vesting: StorageDescriptor<[Key: SS58String], Anonymize<Ifble4juuml5ig>, true, never>;
        /**
         * Storage version of the pallet.
         *
         * New networks start with latest version, as determined by the genesis build.
         */
        StorageVersion: StorageDescriptor<[], Version, false, never>;
    };
    Claims: {
        /**
        
         */
        Claims: StorageDescriptor<[Key: FixedSizeBinary<20>], bigint, true, never>;
        /**
        
         */
        Total: StorageDescriptor<[], bigint, false, never>;
        /**
         * Vesting schedule for a claim.
         * First balance is the total amount that should be held for vesting.
         * Second balance is how much should be unlocked per block.
         * The block number is when the vesting should start.
         */
        Vesting: StorageDescriptor<[Key: FixedSizeBinary<20>], Anonymize<I2phecamkn3pej>, true, never>;
        /**
         * The statement kind that must be signed, if any.
         */
        Signing: StorageDescriptor<[Key: FixedSizeBinary<20>], ClaimsStatementKind, true, never>;
        /**
         * Pre-claimed Ethereum accounts, by the Account ID that they are claimed to.
         */
        Preclaims: StorageDescriptor<[Key: SS58String], FixedSizeBinary<20>, true, never>;
    };
    Authorship: {
        /**
         * Author of current block.
         */
        Author: StorageDescriptor<[], SS58String, true, never>;
    };
    CollatorSelection: {
        /**
         * The invulnerable, permissioned collators. This list must be sorted.
         */
        Invulnerables: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * The (community, limited) collation candidates. `Candidates` and `Invulnerables` should be
         * mutually exclusive.
         *
         * This list is sorted in ascending order by deposit and when the deposits are equal, the least
         * recently updated is considered greater.
         */
        CandidateList: StorageDescriptor<[], Anonymize<Ifi4da1gej1fri>, false, never>;
        /**
         * Last block authored by collator.
         */
        LastAuthoredBlock: StorageDescriptor<[Key: SS58String], number, false, never>;
        /**
         * Desired number of candidates.
         *
         * This should ideally always be less than [`Config::MaxCandidates`] for weights to be correct.
         */
        DesiredCandidates: StorageDescriptor<[], number, false, never>;
        /**
         * Fixed amount to deposit to become a collator.
         *
         * When a collator calls `leave_intent` they immediately receive the deposit back.
         */
        CandidacyBond: StorageDescriptor<[], bigint, false, never>;
    };
    Session: {
        /**
         * The current set of validators.
         */
        Validators: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Current index of the session.
         */
        CurrentIndex: StorageDescriptor<[], number, false, never>;
        /**
         * True if the underlying economic identities or weighting behind the validators
         * has changed in the queued validator set.
         */
        QueuedChanged: StorageDescriptor<[], boolean, false, never>;
        /**
         * The queued keys for the next session. When the next session begins, these keys
         * will be used to determine the validator's session keys.
         */
        QueuedKeys: StorageDescriptor<[], Anonymize<Ifvgo9568rpmqc>, false, never>;
        /**
         * Indices of disabled validators.
         *
         * The vec is always kept sorted so that we can find whether a given validator is
         * disabled using binary search. It gets cleared when `on_session_ending` returns
         * a new set of identities.
         */
        DisabledValidators: StorageDescriptor<[], Anonymize<I95g6i7ilua7lq>, false, never>;
        /**
         * The next session keys for a validator.
         */
        NextKeys: StorageDescriptor<[Key: SS58String], FixedSizeBinary<32>, true, never>;
        /**
         * The owner of a key. The key is the `KeyTypeId` + the encoded key.
         */
        KeyOwner: StorageDescriptor<[Key: Anonymize<I82jm9g7pufuel>], SS58String, true, never>;
    };
    Aura: {
        /**
         * The current authority set.
         */
        Authorities: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * The current slot of this block.
         *
         * This will be set in `on_initialize`.
         */
        CurrentSlot: StorageDescriptor<[], bigint, false, never>;
    };
    AuraExt: {
        /**
         * Serves as cache for the authorities.
         *
         * The authorities in AuRa are overwritten in `on_initialize` when we switch to a new session,
         * but we require the old authorities to verify the seal when validating a PoV. This will
         * always be updated to the latest AuRa authorities in `on_finalize`.
         */
        Authorities: StorageDescriptor<[], Anonymize<Ic5m5lp1oioo8r>, false, never>;
        /**
         * Current relay chain slot paired with a number of authored blocks.
         *
         * This is updated in [`FixedVelocityConsensusHook::on_state_proof`] with the current relay
         * chain slot as provided by the relay chain state proof.
         */
        RelaySlotInfo: StorageDescriptor<[], Anonymize<I6cs1itejju2vv>, true, never>;
    };
    XcmpQueue: {
        /**
         * The suspended inbound XCMP channels. All others are not suspended.
         *
         * This is a `StorageValue` instead of a `StorageMap` since we expect multiple reads per block
         * to different keys with a one byte payload. The access to `BoundedBTreeSet` will be cached
         * within the block and therefore only included once in the proof size.
         *
         * NOTE: The PoV benchmarking cannot know this and will over-estimate, but the actual proof
         * will be smaller.
         */
        InboundXcmpSuspended: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * The non-empty XCMP channels in order of becoming non-empty, and the index of the first
         * and last outbound message. If the two indices are equal, then it indicates an empty
         * queue and there must be a non-`Ok` `OutboundStatus`. We assume queues grow no greater
         * than 65535 items. Queue indices for normal messages begin at one; zero is reserved in
         * case of the need to send a high-priority signal message this block.
         * The bool is true if there is a signal message waiting to be sent.
         */
        OutboundXcmpStatus: StorageDescriptor<[], Anonymize<Ib77b0fp1a6mjr>, false, never>;
        /**
         * The messages outbound in a given XCMP channel.
         */
        OutboundXcmpMessages: StorageDescriptor<Anonymize<I5g2vv0ckl2m8b>, Binary, false, never>;
        /**
         * Any signal messages waiting to be sent.
         */
        SignalMessages: StorageDescriptor<[Key: number], Binary, false, never>;
        /**
         * The configuration which controls the dynamics of the outbound queue.
         */
        QueueConfig: StorageDescriptor<[], Anonymize<Ifup3lg9ro8a0f>, false, never>;
        /**
         * Whether or not the XCMP queue is suspended from executing incoming XCMs or not.
         */
        QueueSuspended: StorageDescriptor<[], boolean, false, never>;
        /**
         * The factor to multiply the base delivery fee by.
         */
        DeliveryFeeFactor: StorageDescriptor<[Key: number], bigint, false, never>;
    };
    PolkadotXcm: {
        /**
         * The latest available query index.
         */
        QueryCounter: StorageDescriptor<[], bigint, false, never>;
        /**
         * The ongoing queries.
         */
        Queries: StorageDescriptor<[Key: bigint], Anonymize<I5qfubnuvrnqn6>, true, never>;
        /**
         * The existing asset traps.
         *
         * Key is the blake2 256 hash of (origin, versioned `Assets`) pair. Value is the number of
         * times this pair has been trapped (usually just 1 if it exists at all).
         */
        AssetTraps: StorageDescriptor<[Key: FixedSizeBinary<32>], number, false, never>;
        /**
         * Default version to encode XCM when latest version of destination is unknown. If `None`,
         * then the destinations whose XCM version is unknown are considered unreachable.
         */
        SafeXcmVersion: StorageDescriptor<[], number, true, never>;
        /**
         * The Latest versions that we know various locations support.
         */
        SupportedVersion: StorageDescriptor<Anonymize<I8t3u2dv73ahbd>, number, true, never>;
        /**
         * All locations that we have requested version notifications from.
         */
        VersionNotifiers: StorageDescriptor<Anonymize<I8t3u2dv73ahbd>, bigint, true, never>;
        /**
         * The target locations that are subscribed to our version changes, as well as the most recent
         * of our versions we informed them of.
         */
        VersionNotifyTargets: StorageDescriptor<Anonymize<I8t3u2dv73ahbd>, Anonymize<I7vlvrrl2pnbgk>, true, never>;
        /**
         * Destinations whose latest XCM version we would like to know. Duplicates not allowed, and
         * the `u32` counter is the number of times that a send to the destination has been attempted,
         * which is used as a prioritization.
         */
        VersionDiscoveryQueue: StorageDescriptor<[], Anonymize<Ie0rpl5bahldfk>, false, never>;
        /**
         * The current migration's stage, if any.
         */
        CurrentMigration: StorageDescriptor<[], XcmPalletVersionMigrationStage, true, never>;
        /**
         * Fungible assets which we know are locked on a remote chain.
         */
        RemoteLockedFungibles: StorageDescriptor<Anonymize<Ie849h3gncgvok>, Anonymize<I7e5oaj2qi4kl1>, true, never>;
        /**
         * Fungible assets which we know are locked on this chain.
         */
        LockedFungibles: StorageDescriptor<[Key: SS58String], Anonymize<Iat62vud7hlod2>, true, never>;
        /**
         * Global suspension state of the XCM executor.
         */
        XcmExecutionSuspended: StorageDescriptor<[], boolean, false, never>;
        /**
         * Whether or not incoming XCMs (both executed locally and received) should be recorded.
         * Only one XCM program will be recorded at a time.
         * This is meant to be used in runtime APIs, and it's advised it stays false
         * for all other use cases, so as to not degrade regular performance.
         *
         * Only relevant if this pallet is being used as the [`xcm_executor::traits::RecordXcm`]
         * implementation in the XCM executor configuration.
         */
        ShouldRecordXcm: StorageDescriptor<[], boolean, false, never>;
        /**
         * If [`ShouldRecordXcm`] is set to true, then the last XCM program executed locally
         * will be stored here.
         * Runtime APIs can fetch the XCM that was executed by accessing this value.
         *
         * Only relevant if this pallet is being used as the [`xcm_executor::traits::RecordXcm`]
         * implementation in the XCM executor configuration.
         */
        RecordedXcm: StorageDescriptor<[], Anonymize<Ict03eedr8de9s>, true, never>;
        /**
         * Map of authorized aliasers of local origins. Each local location can authorize a list of
         * other locations to alias into it. Each aliaser is only valid until its inner `expiry`
         * block number.
         */
        AuthorizedAliases: StorageDescriptor<[Key: XcmVersionedLocation], Anonymize<Ibkm2gcn4pji30>, true, never>;
    };
    ToKusamaXcmRouter: {
        /**
         * Bridge that we are using.
         *
         * **bridges-v1** assumptions: all outbound messages through this router are using single lane
         * and to single remote consensus. If there is some other remote consensus that uses the same
         * bridge hub, the separate pallet instance shall be used, In `v2` we'll have all required
         * primitives (lane-id aka bridge-id, derived from XCM locations) to support multiple  bridges
         * by the same pallet instance.
         */
        Bridge: StorageDescriptor<[], Anonymize<I7f4alf2hnuu8s>, false, never>;
    };
    MessageQueue: {
        /**
         * The index of the first and last (non-empty) pages.
         */
        BookStateFor: StorageDescriptor<[Key: Anonymize<Iejeo53sea6n4q>], Anonymize<Idh2ug6ou4a8og>, false, never>;
        /**
         * The origin at which we should begin servicing.
         */
        ServiceHead: StorageDescriptor<[], Anonymize<Iejeo53sea6n4q>, true, never>;
        /**
         * The map of page indices to pages.
         */
        Pages: StorageDescriptor<Anonymize<Ib4jhb8tt3uung>, Anonymize<I53esa2ms463bk>, true, never>;
    };
    SnowbridgeSystemFrontend: {
        /**
         * The current operating mode for exporting to Ethereum.
         */
        ExportOperatingMode: StorageDescriptor<[], Anonymize<Ibqjcgmcid3dll>, false, never>;
    };
    Multisig: {
        /**
         * The set of open multisig operations.
         */
        Multisigs: StorageDescriptor<Anonymize<I8uo3fpd3bcc6f>, Anonymize<Iag146hmjgqfgj>, true, never>;
    };
    Proxy: {
        /**
         * The set of account proxies. Maps the account which has delegated to the accounts
         * which are being delegated to, together with the amount held on deposit.
         */
        Proxies: StorageDescriptor<[Key: SS58String], Anonymize<Idg5pmtj0nu2j2>, false, never>;
        /**
         * The announcements made by the proxy (key).
         */
        Announcements: StorageDescriptor<[Key: SS58String], Anonymize<I9p9lq3rej5bhc>, false, never>;
    };
    Indices: {
        /**
         * The lookup from index to account.
         */
        Accounts: StorageDescriptor<[Key: number], Anonymize<Iff9heri56m1mb>, true, never>;
    };
    Assets: {
        /**
         * Details of an asset.
         */
        Asset: StorageDescriptor<[Key: number], Anonymize<I3qklfjubrljqh>, true, never>;
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Iag3f1hum3p4c8>, true, never>;
        /**
         * Approved balance transfers. First balance is the amount approved for transfer. Second
         * is the amount of `T::Currency` reserved for storing this.
         * First key is the asset ID, second key is the owner and third key is the delegate.
         */
        Approvals: StorageDescriptor<Anonymize<I2brm5b9jij1st>, Anonymize<I4s6jkha20aoh0>, true, never>;
        /**
         * Metadata of an asset.
         */
        Metadata: StorageDescriptor<[Key: number], Anonymize<I78s05f59eoi8b>, false, never>;
        /**
         * The asset ID enforced for the next asset creation, if any present. Otherwise, this storage
         * item has no effect.
         *
         * This can be useful for setting up constraints for IDs of the new assets. For example, by
         * providing an initial [`NextAssetId`] and using the [`crate::AutoIncAssetId`] callback, an
         * auto-increment model can be applied to all new asset IDs.
         *
         * The initial next asset ID can be set using the [`GenesisConfig`] or the
         * [SetNextAssetId](`migration::next_asset_id::SetNextAssetId`) migration.
         */
        NextAssetId: StorageDescriptor<[], number, true, never>;
    };
    Uniques: {
        /**
         * Details of a collection.
         */
        Class: StorageDescriptor<[Key: number], Anonymize<Ianufjuplcj6u4>, true, never>;
        /**
         * The collection, if any, of which an account is willing to take ownership.
         */
        OwnershipAcceptance: StorageDescriptor<[Key: SS58String], number, true, never>;
        /**
         * The items held by any given account; set out this way so that items owned by a single
         * account can be enumerated.
         */
        Account: StorageDescriptor<Anonymize<Id32h28hjj1tch>, null, true, never>;
        /**
         * The collections owned by any given account; set out this way so that collections owned by
         * a single account can be enumerated.
         */
        ClassAccount: StorageDescriptor<Anonymize<I6ouflveob4eli>, null, true, never>;
        /**
         * The items in existence and their ownership details.
         */
        Asset: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<I2mv9dvsaj3kcr>, true, never>;
        /**
         * Metadata of a collection.
         */
        ClassMetadataOf: StorageDescriptor<[Key: number], Anonymize<I7781vnk0rm9eq>, true, never>;
        /**
         * Metadata of an item.
         */
        InstanceMetadataOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<I7781vnk0rm9eq>, true, never>;
        /**
         * Attributes of a collection.
         */
        Attribute: StorageDescriptor<Anonymize<I5irutptk105do>, Anonymize<Ie2iqtdb0stqo1>, true, never>;
        /**
         * Price of an asset instance.
         */
        ItemPriceOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Ic9nev69d8grv1>, true, never>;
        /**
         * Keeps track of the number of items a collection might have.
         */
        CollectionMaxSupply: StorageDescriptor<[Key: number], number, true, never>;
    };
    Nfts: {
        /**
         * Details of a collection.
         */
        Collection: StorageDescriptor<[Key: number], Anonymize<I18m6a0sc4k7s9>, true, never>;
        /**
         * The collection, if any, of which an account is willing to take ownership.
         */
        OwnershipAcceptance: StorageDescriptor<[Key: SS58String], number, true, never>;
        /**
         * The items held by any given account; set out this way so that items owned by a single
         * account can be enumerated.
         */
        Account: StorageDescriptor<Anonymize<Id32h28hjj1tch>, null, true, never>;
        /**
         * The collections owned by any given account; set out this way so that collections owned by
         * a single account can be enumerated.
         */
        CollectionAccount: StorageDescriptor<Anonymize<I6ouflveob4eli>, null, true, never>;
        /**
         * The items in existence and their ownership details.
         * Stores collection roles as per account.
         */
        CollectionRoleOf: StorageDescriptor<Anonymize<I7svnfko10tq2e>, number, true, never>;
        /**
         * The items in existence and their ownership details.
         */
        Item: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Ic9iokm15iigt6>, true, never>;
        /**
         * Metadata of a collection.
         */
        CollectionMetadataOf: StorageDescriptor<[Key: number], Anonymize<I35m96p3u4vl0p>, true, never>;
        /**
         * Metadata of an item.
         */
        ItemMetadataOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Iapmji0h53pmkn>, true, never>;
        /**
         * Attributes of a collection.
         */
        Attribute: StorageDescriptor<Anonymize<I4ugih6gb4fmug>, Anonymize<Idrr42svup341f>, true, never>;
        /**
         * A price of an item.
         */
        ItemPriceOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Ic9nev69d8grv1>, true, never>;
        /**
         * Item attribute approvals.
         */
        ItemAttributesApprovalsOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Stores the `CollectionId` that is going to be used for the next collection.
         * This gets incremented whenever a new collection is created.
         */
        NextCollectionId: StorageDescriptor<[], number, true, never>;
        /**
         * Handles all the pending swaps.
         */
        PendingSwapOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Idac0t49lnd4ls>, true, never>;
        /**
         * Config of a collection.
         */
        CollectionConfigOf: StorageDescriptor<[Key: number], Anonymize<I72ndo6phms8ik>, true, never>;
        /**
         * Config of an item.
         */
        ItemConfigOf: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, bigint, true, never>;
    };
    ForeignAssets: {
        /**
         * Details of an asset.
         */
        Asset: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], Anonymize<I3qklfjubrljqh>, true, never>;
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<I4v5g6i7bmt06o>, Anonymize<Iag3f1hum3p4c8>, true, never>;
        /**
         * Approved balance transfers. First balance is the amount approved for transfer. Second
         * is the amount of `T::Currency` reserved for storing this.
         * First key is the asset ID, second key is the owner and third key is the delegate.
         */
        Approvals: StorageDescriptor<Anonymize<I84bhscllvv07n>, Anonymize<I4s6jkha20aoh0>, true, never>;
        /**
         * Metadata of an asset.
         */
        Metadata: StorageDescriptor<[Key: Anonymize<If9iqq7i64mur8>], Anonymize<I78s05f59eoi8b>, false, never>;
        /**
         * The asset ID enforced for the next asset creation, if any present. Otherwise, this storage
         * item has no effect.
         *
         * This can be useful for setting up constraints for IDs of the new assets. For example, by
         * providing an initial [`NextAssetId`] and using the [`crate::AutoIncAssetId`] callback, an
         * auto-increment model can be applied to all new asset IDs.
         *
         * The initial next asset ID can be set using the [`GenesisConfig`] or the
         * [SetNextAssetId](`migration::next_asset_id::SetNextAssetId`) migration.
         */
        NextAssetId: StorageDescriptor<[], Anonymize<If9iqq7i64mur8>, true, never>;
    };
    PoolAssets: {
        /**
         * Details of an asset.
         */
        Asset: StorageDescriptor<[Key: number], Anonymize<I3qklfjubrljqh>, true, never>;
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Iag3f1hum3p4c8>, true, never>;
        /**
         * Approved balance transfers. First balance is the amount approved for transfer. Second
         * is the amount of `T::Currency` reserved for storing this.
         * First key is the asset ID, second key is the owner and third key is the delegate.
         */
        Approvals: StorageDescriptor<Anonymize<I2brm5b9jij1st>, Anonymize<I4s6jkha20aoh0>, true, never>;
        /**
         * Metadata of an asset.
         */
        Metadata: StorageDescriptor<[Key: number], Anonymize<I78s05f59eoi8b>, false, never>;
        /**
         * The asset ID enforced for the next asset creation, if any present. Otherwise, this storage
         * item has no effect.
         *
         * This can be useful for setting up constraints for IDs of the new assets. For example, by
         * providing an initial [`NextAssetId`] and using the [`crate::AutoIncAssetId`] callback, an
         * auto-increment model can be applied to all new asset IDs.
         *
         * The initial next asset ID can be set using the [`GenesisConfig`] or the
         * [SetNextAssetId](`migration::next_asset_id::SetNextAssetId`) migration.
         */
        NextAssetId: StorageDescriptor<[], number, true, never>;
    };
    AssetConversion: {
        /**
         * Map from `PoolAssetId` to `PoolInfo`. This establishes whether a pool has been officially
         * created rather than people sending tokens directly to a pool's public account.
         */
        Pools: StorageDescriptor<[Key: Anonymize<If21n82i0516em>], number, true, never>;
        /**
         * Stores the `PoolAssetId` that is going to be used for the next lp token.
         * This gets incremented whenever a new lp pool is created.
         */
        NextPoolAssetId: StorageDescriptor<[], number, true, never>;
    };
    Treasury: {
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * Number of proposals that have been made.
         */
        ProposalCount: StorageDescriptor<[], number, false, never>;
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * Proposals that have been made.
         */
        Proposals: StorageDescriptor<[Key: number], Anonymize<Iegmj7n48sc3am>, true, never>;
        /**
         * The amount which has been reported as inactive to Currency.
         */
        Deactivated: StorageDescriptor<[], bigint, false, never>;
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * Proposal indices that have been approved but not yet awarded.
         */
        Approvals: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * The count of spends that have been made.
         */
        SpendCount: StorageDescriptor<[], number, false, never>;
        /**
         * Spends that have been approved and being processed.
         */
        Spends: StorageDescriptor<[Key: number], Anonymize<I2l0beelkqtf0a>, true, never>;
        /**
         * The blocknumber for the last triggered spend period.
         */
        LastSpendPeriod: StorageDescriptor<[], number, true, never>;
    };
    ConvictionVoting: {
        /**
         * All voting for a particular voter in a particular voting class. We store the balance for the
         * number of votes that we have recorded.
         */
        VotingFor: StorageDescriptor<Anonymize<I6ouflveob4eli>, ConvictionVotingVoteVoting, false, never>;
        /**
         * The voting classes which have a non-zero lock requirement and the lock amounts which they
         * require. The actual amount locked on behalf of this pallet should always be the maximum of
         * this list.
         */
        ClassLocksFor: StorageDescriptor<[Key: SS58String], Anonymize<If9jidduiuq7vv>, false, never>;
    };
    Referenda: {
        /**
         * The next free referendum index, aka the number of referenda started so far.
         */
        ReferendumCount: StorageDescriptor<[], number, false, never>;
        /**
         * Information concerning any given referendum.
         */
        ReferendumInfoFor: StorageDescriptor<[Key: number], Anonymize<I41nj8f5r4c9e7>, true, never>;
        /**
         * The sorted list of referenda ready to be decided but not yet being decided, ordered by
         * conviction-weighted approvals.
         *
         * This should be empty if `DecidingCount` is less than `TrackInfo::max_deciding`.
         */
        TrackQueue: StorageDescriptor<[Key: number], Anonymize<If9jidduiuq7vv>, false, never>;
        /**
         * The number of referenda being decided currently.
         */
        DecidingCount: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * The metadata is a general information concerning the referendum.
         * The `Hash` refers to the preimage of the `Preimages` provider which can be a JSON
         * dump or IPFS hash of a JSON file.
         *
         * Consider a garbage collection for a metadata of finished referendums to `unrequest` (remove)
         * large preimages.
         */
        MetadataOf: StorageDescriptor<[Key: number], FixedSizeBinary<32>, true, never>;
    };
    Whitelist: {
        /**
        
         */
        WhitelistedCall: StorageDescriptor<[Key: FixedSizeBinary<32>], null, true, never>;
    };
    Bounties: {
        /**
         * Number of bounty proposals that have been made.
         */
        BountyCount: StorageDescriptor<[], number, false, never>;
        /**
         * Bounties that have been made.
         */
        Bounties: StorageDescriptor<[Key: number], Anonymize<Ict0fmb8krq1lk>, true, never>;
        /**
         * The description of each bounty.
         */
        BountyDescriptions: StorageDescriptor<[Key: number], Binary, true, never>;
        /**
         * Bounty indices that have been approved but not yet funded.
         */
        BountyApprovals: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, false, never>;
    };
    ChildBounties: {
        /**
         * DEPRECATED: Replaced with `ParentTotalChildBounties` storage item keeping dedicated counts
         * for each parent bounty. Number of total child bounties. Will be removed in May 2025.
         */
        ChildBountyCount: StorageDescriptor<[], number, false, never>;
        /**
         * Number of active child bounties per parent bounty.
         * Map of parent bounty index to number of child bounties.
         */
        ParentChildBounties: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * Number of total child bounties per parent bounty, including completed bounties.
         */
        ParentTotalChildBounties: StorageDescriptor<[Key: number], number, false, never>;
        /**
         * Child bounties that have been added.
         */
        ChildBounties: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Ibofbvvaehln4e>, true, never>;
        /**
         * The description of each child-bounty. Indexed by `(parent_id, child_id)`.
         *
         * This item replaces the `ChildBountyDescriptions` storage item from the V0 storage version.
         */
        ChildBountyDescriptionsV1: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Binary, true, never>;
        /**
         * The mapping of the child bounty ids from storage version `V0` to the new `V1` version.
         *
         * The `V0` ids based on total child bounty count [`ChildBountyCount`]`. The `V1` version ids
         * based on the child bounty count per parent bounty [`ParentTotalChildBounties`].
         * The item intended solely for client convenience and not used in the pallet's core logic.
         */
        V0ToV1ChildBountyIds: StorageDescriptor<[Key: number], Anonymize<I9jd27rnpm8ttv>, true, never>;
        /**
         * The cumulative child-bounty curator fee for each parent bounty.
         */
        ChildrenCuratorFees: StorageDescriptor<[Key: number], bigint, false, never>;
    };
    AssetRate: {
        /**
         * Maps an asset to its fixed point representation in the native balance.
         *
         * E.g. `native_amount = asset_amount * ConversionRateToNative::<T>::get(asset_kind)`
         */
        ConversionRateToNative: StorageDescriptor<[Key: Anonymize<I2q3ri6itcjj5u>], bigint, true, never>;
    };
    StateTrieMigration: {
        /**
         * Migration progress.
         *
         * This stores the snapshot of the last migrated keys. It can be set into motion and move
         * forward by any of the means provided by this pallet.
         */
        MigrationProcess: StorageDescriptor<[], Anonymize<If354jrdedj0pj>, false, never>;
        /**
         * The limits that are imposed on automatic migrations.
         *
         * If set to None, then no automatic migration happens.
         */
        AutoLimits: StorageDescriptor<[], Anonymize<Ib17t3992hb64n>, false, never>;
        /**
         * The maximum limits that the signed migration could use.
         *
         * If not set, no signed submission is allowed.
         */
        SignedMigrationMaxLimits: StorageDescriptor<[], Anonymize<I215mkl885p4da>, true, never>;
    };
    Staking: {
        /**
         * The ideal number of active validators.
         */
        ValidatorCount: StorageDescriptor<[], number, false, never>;
        /**
         * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
         * easy to initialize and the performance hit is minimal (we expect no more than four
         * invulnerables) and restricted to testnets.
         */
        Invulnerables: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Map from all locked "stash" accounts to the controller account.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Bonded: StorageDescriptor<[Key: SS58String], SS58String, true, never>;
        /**
         * The minimum active bond to become and maintain the role of a nominator.
         */
        MinNominatorBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * The minimum active bond to become and maintain the role of a validator.
         */
        MinValidatorBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * The minimum active nominator stake of the last successful election.
         */
        MinimumActiveStake: StorageDescriptor<[], bigint, false, never>;
        /**
         * The minimum amount of commission that validators can set.
         *
         * If set to `0`, no limit exists.
         */
        MinCommission: StorageDescriptor<[], number, false, never>;
        /**
         * Map from all (unlocked) "controller" accounts to the info regarding the staking.
         *
         * Note: All the reads and mutations to this storage *MUST* be done through the methods exposed
         * by [`StakingLedger`] to ensure data and lock consistency.
         */
        Ledger: StorageDescriptor<[Key: SS58String], Anonymize<I69tqqtpr9n8ie>, true, never>;
        /**
         * Where the reward payment should be made. Keyed by stash.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Payee: StorageDescriptor<[Key: SS58String], StakingRewardDestination, true, never>;
        /**
         * The map from (wannabe) validator stash key to the preferences of that validator.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Validators: StorageDescriptor<[Key: SS58String], Anonymize<I9o7ssi9vmhmgr>, false, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForValidators: StorageDescriptor<[], number, false, never>;
        /**
         * The maximum validator count before we stop allowing new validators to join.
         *
         * When this value is not set, no limits are enforced.
         */
        MaxValidatorsCount: StorageDescriptor<[], number, true, never>;
        /**
         * The map from nominator stash key to their nomination preferences, namely the validators that
         * they wish to support.
         *
         * Note that the keys of this storage map might become non-decodable in case the
         * account's [`NominationsQuota::MaxNominations`] configuration is decreased.
         * In this rare case, these nominators
         * are still existent in storage, their key is correct and retrievable (i.e. `contains_key`
         * indicates that they exist), but their value cannot be decoded. Therefore, the non-decodable
         * nominators will effectively not-exist, until they re-submit their preferences such that it
         * is within the bounds of the newly set `Config::MaxNominations`.
         *
         * This implies that `::iter_keys().count()` and `::iter().count()` might return different
         * values for this map. Moreover, the main `::count()` is aligned with the former, namely the
         * number of keys that exist.
         *
         * Lastly, if any of the nominators become non-decodable, they can be chilled immediately via
         * [`Call::chill_other`] dispatchable by anyone.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        Nominators: StorageDescriptor<[Key: SS58String], Anonymize<Ic3m9d6tdl6gi2>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForNominators: StorageDescriptor<[], number, false, never>;
        /**
         * Stakers whose funds are managed by other pallets.
         *
         * This pallet does not apply any locks on them, therefore they are only virtually bonded. They
         * are expected to be keyless accounts and hence should not be allowed to mutate their ledger
         * directly via this pallet. Instead, these accounts are managed by other pallets and accessed
         * via low level apis. We keep track of them to do minimal integrity checks.
         */
        VirtualStakers: StorageDescriptor<[Key: SS58String], null, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForVirtualStakers: StorageDescriptor<[], number, false, never>;
        /**
         * The maximum nominator count before we stop allowing new validators to join.
         *
         * When this value is not set, no limits are enforced.
         */
        MaxNominatorsCount: StorageDescriptor<[], number, true, never>;
        /**
         * The current planned era index.
         *
         * This is the latest planned era, depending on how the Session pallet queues the validator
         * set, it might be active or not.
         */
        CurrentEra: StorageDescriptor<[], number, true, never>;
        /**
         * The active era information, it holds index and start.
         *
         * The active era is the era being currently rewarded. Validator set of this era must be
         * equal to what is RC's session pallet.
         */
        ActiveEra: StorageDescriptor<[], Anonymize<Ib3j7gb0jgs38u>, true, never>;
        /**
         * A mapping from still-bonded eras to the first session index of that era.
         *
         * Must contains information for eras for the range:
         * `[active_era - bounding_duration; active_era]`
         */
        BondedEras: StorageDescriptor<[], Anonymize<I95g6i7ilua7lq>, false, never>;
        /**
         * Summary of validator exposure at a given era.
         *
         * This contains the total stake in support of the validator and their own stake. In addition,
         * it can also be used to get the number of nominators backing this validator and the number of
         * exposure pages they are divided into. The page count is useful to determine the number of
         * pages of rewards that needs to be claimed.
         *
         * This is keyed first by the era index to allow bulk deletion and then the stash account.
         * Should only be accessed through `Eras`.
         *
         * Is it removed after [`Config::HistoryDepth`] eras.
         * If stakers hasn't been set or has been removed then empty overview is returned.
         */
        ErasStakersOverview: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I6flrronqs3l6n>, true, never>;
        /**
         * Paginated exposure of a validator at given era.
         *
         * This is keyed first by the era index to allow bulk deletion, then stash account and finally
         * the page. Should only be accessed through `Eras`.
         *
         * This is cleared after [`Config::HistoryDepth`] eras.
         */
        ErasStakersPaged: StorageDescriptor<Anonymize<Ia8896dq44k9m4>, Anonymize<I97fulj5h3ik95>, true, never>;
        /**
         * History of claimed paged rewards by era and validator.
         *
         * This is keyed by era and validator stash which maps to the set of page indexes which have
         * been claimed.
         *
         * It is removed after [`Config::HistoryDepth`] eras.
         */
        ClaimedRewards: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Icgljjb6j82uhn>, false, never>;
        /**
         * Exposure of validator at era with the preferences of validators.
         *
         * This is keyed first by the era index to allow bulk deletion and then the stash account.
         *
         * Is it removed after [`Config::HistoryDepth`] eras.
         */
        ErasValidatorPrefs: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I9o7ssi9vmhmgr>, false, never>;
        /**
         * The total validator era payout for the last [`Config::HistoryDepth`] eras.
         *
         * Eras that haven't finished yet or has been removed doesn't have reward.
         */
        ErasValidatorReward: StorageDescriptor<[Key: number], bigint, true, never>;
        /**
         * Rewards for the last [`Config::HistoryDepth`] eras.
         * If reward hasn't been set or has been removed then 0 reward is returned.
         */
        ErasRewardPoints: StorageDescriptor<[Key: number], Anonymize<Iff9p3c7k6pfoi>, false, never>;
        /**
         * The total amount staked for the last [`Config::HistoryDepth`] eras.
         * If total hasn't been set or has been removed then 0 stake is returned.
         */
        ErasTotalStake: StorageDescriptor<[Key: number], bigint, false, never>;
        /**
         * Mode of era forcing.
         */
        ForceEra: StorageDescriptor<[], StakingForcing, false, never>;
        /**
         * Maximum staked rewards, i.e. the percentage of the era inflation that
         * is used for stake rewards.
         * See [Era payout](./index.html#era-payout).
         */
        MaxStakedRewards: StorageDescriptor<[], number, true, never>;
        /**
         * The percentage of the slash that is distributed to reporters.
         *
         * The rest of the slashed value is handled by the `Slash`.
         */
        SlashRewardFraction: StorageDescriptor<[], number, false, never>;
        /**
         * The amount of currency given to reporters of a slash event which was
         * canceled by extraordinary circumstances (e.g. governance).
         */
        CanceledSlashPayout: StorageDescriptor<[], bigint, false, never>;
        /**
         * Stores reported offences in a queue until they are processed in subsequent blocks.
         *
         * Each offence is recorded under the corresponding era index and the offending validator's
         * account. If an offence spans multiple pages, only one page is processed at a time. Offences
         * are handled sequentially, with their associated slashes computed and stored in
         * `UnappliedSlashes`. These slashes are then applied in a future era as determined by
         * `SlashDeferDuration`.
         *
         * Any offences tied to an era older than `BondingDuration` are automatically dropped.
         * Processing always prioritizes the oldest era first.
         */
        OffenceQueue: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I7oqom2n34q7u8>, true, never>;
        /**
         * Tracks the eras that contain offences in `OffenceQueue`, sorted from **earliest to latest**.
         *
         * - This ensures efficient retrieval of the oldest offence without iterating through
         * `OffenceQueue`.
         * - When a new offence is added to `OffenceQueue`, its era is **inserted in sorted order**
         * if not already present.
         * - When all offences for an era are processed, it is **removed** from this list.
         * - The maximum length of this vector is bounded by `BondingDuration`.
         *
         * This eliminates the need for expensive iteration and sorting when fetching the next offence
         * to process.
         */
        OffenceQueueEras: StorageDescriptor<[], Anonymize<Icgljjb6j82uhn>, true, never>;
        /**
         * Tracks the currently processed offence record from the `OffenceQueue`.
         *
         * - When processing offences, an offence record is **popped** from the oldest era in
         * `OffenceQueue` and stored here.
         * - The function `process_offence` reads from this storage, processing one page of exposure at
         * a time.
         * - After processing a page, the `exposure_page` count is **decremented** until it reaches
         * zero.
         * - Once fully processed, the offence record is removed from this storage.
         *
         * This ensures that offences are processed incrementally, preventing excessive computation
         * in a single block while maintaining correct slashing behavior.
         */
        ProcessingOffence: StorageDescriptor<[], Anonymize<I921dks5d4ov9t>, true, never>;
        /**
         * All unapplied slashes that are queued for later.
         */
        UnappliedSlashes: StorageDescriptor<Anonymize<Iam8h8p165t5uu>, Anonymize<Idm2c96td6cqkk>, true, never>;
        /**
         * Cancelled slashes by era and validator with maximum slash fraction to be cancelled.
         *
         * When slashes are cancelled by governance, this stores the era and the validators
         * whose slashes should be cancelled, along with the maximum slash fraction that should
         * be cancelled for each validator.
         */
        CancelledSlashes: StorageDescriptor<[Key: number], Anonymize<I205qrookusi3d>, false, never>;
        /**
         * All slashing events on validators, mapped by era to the highest slash proportion
         * and slash value of the era.
         */
        ValidatorSlashInEra: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<I4ojmnsk1dchql>, true, never>;
        /**
         * The threshold for when users can start calling `chill_other` for other validators /
         * nominators. The threshold is compared to the actual number of validators / nominators
         * (`CountFor*`) in the system compared to the configured max (`Max*Count`).
         */
        ChillThreshold: StorageDescriptor<[], number, true, never>;
        /**
         * Voter snapshot progress status.
         *
         * If the status is `Ongoing`, it keeps a cursor of the last voter retrieved to proceed when
         * creating the next snapshot page.
         */
        VoterSnapshotStatus: StorageDescriptor<[], Anonymize<I70u6ma6po0va2>, false, never>;
        /**
         * Keeps track of an ongoing multi-page election solution request.
         *
         * If `Some(_)``, it is the next page that we intend to elect. If `None`, we are not in the
         * election process.
         *
         * This is only set in multi-block elections. Should always be `None` otherwise.
         */
        NextElectionPage: StorageDescriptor<[], number, true, never>;
        /**
         * A bounded list of the "electable" stashes that resulted from a successful election.
         */
        ElectableStashes: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
         * Tracks the current step of era pruning process for each era being lazily pruned.
         */
        EraPruningState: StorageDescriptor<[Key: number], Anonymize<I2julfd57mkmap>, true, never>;
    };
    NominationPools: {
        /**
         * The sum of funds across all pools.
         *
         * This might be lower but never higher than the sum of `total_balance` of all [`PoolMembers`]
         * because calling `pool_withdraw_unbonded` might decrease the total stake of the pool's
         * `bonded_account` without adjusting the pallet-internal `UnbondingPool`'s.
         */
        TotalValueLocked: StorageDescriptor<[], bigint, false, never>;
        /**
         * Minimum amount to bond to join a pool.
         */
        MinJoinBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * Minimum bond required to create a pool.
         *
         * This is the amount that the depositor must put as their initial stake in the pool, as an
         * indication of "skin in the game".
         *
         * This is the value that will always exist in the staking ledger of the pool bonded account
         * while all other accounts leave.
         */
        MinCreateBond: StorageDescriptor<[], bigint, false, never>;
        /**
         * Maximum number of nomination pools that can exist. If `None`, then an unbounded number of
         * pools can exist.
         */
        MaxPools: StorageDescriptor<[], number, true, never>;
        /**
         * Maximum number of members that can exist in the system. If `None`, then the count
         * members are not bound on a system wide basis.
         */
        MaxPoolMembers: StorageDescriptor<[], number, true, never>;
        /**
         * Maximum number of members that may belong to pool. If `None`, then the count of
         * members is not bound on a per pool basis.
         */
        MaxPoolMembersPerPool: StorageDescriptor<[], number, true, never>;
        /**
         * The maximum commission that can be charged by a pool. Used on commission payouts to bound
         * pool commissions that are > `GlobalMaxCommission`, necessary if a future
         * `GlobalMaxCommission` is lower than some current pool commissions.
         */
        GlobalMaxCommission: StorageDescriptor<[], number, true, never>;
        /**
         * Active members.
         *
         * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
         */
        PoolMembers: StorageDescriptor<[Key: SS58String], Anonymize<Idphjddn2h69vc>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForPoolMembers: StorageDescriptor<[], number, false, never>;
        /**
         * Storage for bonded pools.
         */
        BondedPools: StorageDescriptor<[Key: number], Anonymize<Idhh9vuu2bderg>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForBondedPools: StorageDescriptor<[], number, false, never>;
        /**
         * Reward pools. This is where there rewards for each pool accumulate. When a members payout is
         * claimed, the balance comes out of the reward pool. Keyed by the bonded pools account.
         */
        RewardPools: StorageDescriptor<[Key: number], Anonymize<If6qa32dj75gu1>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForRewardPools: StorageDescriptor<[], number, false, never>;
        /**
         * Groups of unbonding pools. Each group of unbonding pools belongs to a
         * bonded pool, hence the name sub-pools. Keyed by the bonded pools account.
         */
        SubPoolsStorage: StorageDescriptor<[Key: number], Anonymize<I7oo2mprv1qd1s>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForSubPoolsStorage: StorageDescriptor<[], number, false, never>;
        /**
         * Metadata for the pool.
         */
        Metadata: StorageDescriptor<[Key: number], Binary, false, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForMetadata: StorageDescriptor<[], number, false, never>;
        /**
         * Ever increasing number of all pools created so far.
         */
        LastPoolId: StorageDescriptor<[], number, false, never>;
        /**
         * A reverse lookup from the pool's account id to its id.
         *
         * This is only used for slashing and on automatic withdraw update. In all other instances, the
         * pool id is used, and the accounts are deterministically derived from it.
         */
        ReversePoolIdLookup: StorageDescriptor<[Key: SS58String], number, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForReversePoolIdLookup: StorageDescriptor<[], number, false, never>;
        /**
         * Map from a pool member account to their opted claim permission.
         */
        ClaimPermissions: StorageDescriptor<[Key: SS58String], NominationPoolsClaimPermission, false, never>;
    };
    VoterList: {
        /**
         * A single node, within some bag.
         *
         * Nodes store links forward and back within their respective bags.
         */
        ListNodes: StorageDescriptor<[Key: SS58String], Anonymize<Ic5t26f9cp3tvk>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForListNodes: StorageDescriptor<[], number, false, never>;
        /**
         * A bag stored in storage.
         *
         * Stores a `Bag` struct, which stores head and tail pointers to itself.
         */
        ListBags: StorageDescriptor<[Key: bigint], Anonymize<I39k39h6vu4hbq>, true, never>;
        /**
         * Pointer that remembers the next node that will be auto-rebagged.
         * When `None`, the next scan will start from the list head again.
         */
        NextNodeAutoRebagged: StorageDescriptor<[], SS58String, true, never>;
        /**
         * Lock all updates to this pallet.
         *
         * If any nodes needs updating, removal or addition due to a temporary lock, the
         * [`Call::rebag`] can be used.
         */
        Lock: StorageDescriptor<[], null, true, never>;
    };
    DelegatedStaking: {
        /**
         * Map of Delegators to their `Delegation`.
         *
         * Implementation note: We are not using a double map with `delegator` and `agent` account
         * as keys since we want to restrict delegators to delegate only to one account at a time.
         */
        Delegators: StorageDescriptor<[Key: SS58String], Anonymize<I542q009qbgt8k>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForDelegators: StorageDescriptor<[], number, false, never>;
        /**
         * Map of `Agent` to their `Ledger`.
         */
        Agents: StorageDescriptor<[Key: SS58String], Anonymize<I4e5ujckjq61g8>, true, never>;
        /**
         * Counter for the related counted storage map
         */
        CounterForAgents: StorageDescriptor<[], number, false, never>;
    };
    StakingRcClient: {
        /**
         * An incomplete incoming session report that we have not acted upon yet.
         */
        IncompleteSessionReport: StorageDescriptor<[], Anonymize<I3fgbanmq2lnk2>, true, never>;
        /**
         * The last session report's `end_index` that we have acted upon.
         *
         * This allows this pallet to ensure a sequentially increasing sequence of session reports
         * passed to staking.
         *
         * Note that with the XCM being the backbone of communication, we have a guarantee on the
         * ordering of messages. As long as the RC sends session reports in order, we _eventually_
         * receive them in the same correct order as well.
         */
        LastSessionReportEndingIndex: StorageDescriptor<[], number, true, never>;
    };
    MultiBlockElection: {
        /**
         * Internal counter for the number of rounds.
         *
         * This is useful for de-duplication of transactions submitted to the pool, and general
         * diagnostics of the pallet.
         *
         * This is merely incremented once per every time that an upstream `elect` is called.
         */
        Round: StorageDescriptor<[], number, false, never>;
        /**
         * Current phase.
         */
        CurrentPhase: StorageDescriptor<[], Anonymize<I7d4qtdlascfk8>, false, never>;
        /**
         * Desired number of targets to elect for this round.
         */
        DesiredTargets: StorageDescriptor<[Key: number], number, true, never>;
        /**
         * Paginated voter snapshot. At most [`T::Pages`] keys will exist.
         */
        PagedVoterSnapshot: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<I9cpogojpnsq8h>, true, never>;
        /**
         * Same as [`PagedVoterSnapshot`], but it will store the hash of the snapshot.
         *
         * The hash is generated using [`frame_system::Config::Hashing`].
         */
        PagedVoterSnapshotHash: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, FixedSizeBinary<32>, true, never>;
        /**
         * Paginated target snapshot.
         *
         * For the time being, since we assume one pages of targets, at most ONE key will exist.
         */
        PagedTargetSnapshot: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<Ia2lhg7l2hilo3>, true, never>;
        /**
         * Same as [`PagedTargetSnapshot`], but it will store the hash of the snapshot.
         *
         * The hash is generated using [`frame_system::Config::Hashing`].
         */
        PagedTargetSnapshotHash: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, FixedSizeBinary<32>, true, never>;
    };
    MultiBlockElectionVerifier: {
        /**
         * The `X` variant of the current queued solution. Might be the valid one or not.
         *
         * The two variants of this storage item is to avoid the need of copying. Recall that once a
         * `VerifyingSolution` is being processed, it needs to write its partial supports *somewhere*.
         * Writing theses supports on top of a *good* queued supports is wrong, since we might bail.
         * Writing them to a bugger and copying at the ned is slightly better, but expensive. This flag
         * system is best of both worlds.
         */
        QueuedSolutionX: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<I4bboqsv44evel>, true, never>;
        /**
         * The `Y` variant of the current queued solution. Might be the valid one or not.
         */
        QueuedSolutionY: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<I4bboqsv44evel>, true, never>;
        /**
         * Pointer to the variant of [`QueuedSolutionX`] or [`QueuedSolutionY`] that is currently
         * valid.
         */
        QueuedValidVariant: StorageDescriptor<[Key: number], Anonymize<I8je4hjun1hc3g>, false, never>;
        /**
         * The `(amount, count)` of backings, divided per page.
         *
         * This is stored because in the last block of verification we need them to compute the score,
         * and check `MaxBackersPerWinnerFinal`.
         *
         * This can only ever live for the invalid variant of the solution. Once it is valid, we don't
         * need this information anymore; the score is already computed once in
         * [`QueuedSolutionScore`], and the backing counts are checked.
         */
        QueuedSolutionBackings: StorageDescriptor<Anonymize<I9jd27rnpm8ttv>, Anonymize<I3mj0igdqvh474>, true, never>;
        /**
         * The score of the valid variant of [`QueuedSolution`].
         *
         * This only ever lives for the `valid` variant.
         */
        QueuedSolutionScore: StorageDescriptor<[Key: number], Anonymize<I8s6n43okuj2b1>, true, never>;
        /**
         * The minimum score that each solution must attain in order to be considered feasible.
         */
        MinimumScore: StorageDescriptor<[], Anonymize<I8s6n43okuj2b1>, true, never>;
        /**
         * Storage item for [`Status`].
         */
        StatusStorage: StorageDescriptor<[], Anonymize<I29575k8s6asco>, false, never>;
    };
    MultiBlockElectionSigned: {
        /**
         * Accounts whitelisted by governance to always submit their solutions.
         *
         * They are different in that:
         *
         * * They always pay a fixed deposit for submission, specified by
         * [`Config::InvulnerableDeposit`]. They pay no page deposit.
         * * If _ejected_ by better solution from [`SortedScores`], they will get their full deposit
         * back.
         * * They always get their tx-fee back even if they are _discarded_.
         */
        Invulnerables: StorageDescriptor<[], Anonymize<Ia2lhg7l2hilo3>, false, never>;
        /**
        
         */
        SortedScores: StorageDescriptor<[Key: number], Anonymize<I3rfe446il0rb7>, false, never>;
        /**
         * Triple map from (round, account, page) to a solution page.
         */
        SubmissionStorage: StorageDescriptor<Anonymize<Ia8896dq44k9m4>, Anonymize<I1nvcsqg39g26j>, true, never>;
        /**
         * Map from account to the metadata of their submission.
         *
         * invariant: for any Key1 of type `AccountId` in [`Submissions`], this storage map also has a
         * value.
         */
        SubmissionMetadataStorage: StorageDescriptor<Anonymize<I7svnfko10tq2e>, Anonymize<Iefkd2klketjfh>, true, never>;
    };
    Sudo: {
        /**
         * The `AccountId` of the sudo key.
         */
        Key: StorageDescriptor<[], SS58String, true, never>;
    };
    AhOps: {
        /**
         * Amount of balance that was reserved for winning a lease auction.
         *
         * `unreserve_lease_deposit` can be permissionlessly called once the block number passed to
         * unreserve the deposit. It is implicitly called by `withdraw_crowdloan_contribution`.
         *
         * The account here can either be a crowdloan account or a solo bidder. If it is a crowdloan
         * account, then the summed up contributions for it in the contributions map will equate the
         * reserved balance here.
         *
         * The keys are as follows:
         * - Block number after which the deposit can be unreserved.
         * - The para_id of the lease slot.
         * - The account that will have the balance unreserved.
         * - The balance to be unreserved.
         */
        RcLeaseReserve: StorageDescriptor<Anonymize<I6o6dmud53u1fj>, bigint, true, never>;
        /**
         * Amount of balance that a contributor made towards a crowdloan.
         *
         * `withdraw_crowdloan_contribution` can be permissionlessly called once the block number
         * passed to unlock the balance for a specific account.
         *
         * The keys are as follows:
         * - Block number after which the balance can be unlocked.
         * - The para_id of the crowdloan.
         * - The account that made the contribution.
         *
         * The value is (fund_pot, balance). The contribution pot is the second key in the
         * `RcCrowdloanContribution` storage.
         */
        RcCrowdloanContribution: StorageDescriptor<Anonymize<I6o6dmud53u1fj>, Anonymize<I95l2k9b1re95f>, true, never>;
        /**
         * The reserve that was taken to create a crowdloan.
         *
         * This is normally 500 DOT and can be refunded as last step after all
         * `RcCrowdloanContribution`s of this loan have been withdrawn.
         *
         * Keys:
         * - Block number after which this can be unreserved
         * - The para_id of the crowdloan
         * - The account that will have the balance unreserved
         */
        RcCrowdloanReserve: StorageDescriptor<Anonymize<I6o6dmud53u1fj>, bigint, true, never>;
    };
    AhMigrator: {
        /**
         * RC accounts that failed to migrate when were received on the Asset Hub.
         *
         * This is unlikely to happen, since we dry run the migration, but we keep it for completeness.
         */
        RcAccounts: StorageDescriptor<[Key: SS58String], Anonymize<Ifb0kt7cu5a61c>, true, never>;
        /**
         * The Asset Hub migration state.
         */
        AhMigrationStage: StorageDescriptor<[], Anonymize<Ifgh9ocbdogt8l>, false, never>;
        /**
         * Helper storage item to store the total balance / total issuance of native token at the start
         * of the migration. Since teleports are disabled during migration, the total issuance will not
         * change for other reason than the migration itself.
         */
        AhBalancesBefore: StorageDescriptor<[], Anonymize<I1d6j3815ii0ua>, false, never>;
        /**
         * The priority of the DMP queue during migration.
         *
         * Controls how the DMP (Downward Message Passing) queue is processed relative to other queues
         * during the migration process. This helps ensure timely processing of migration messages.
         * The default priority pattern is defined in the pallet configuration, but can be overridden
         * by a storage value of this type.
         */
        DmpQueuePriorityConfig: StorageDescriptor<[], Anonymize<I2fbmombro6ugg>, false, never>;
        /**
         * An optional account id of a manager.
         *
         * This account id has similar privileges to [`Config::AdminOrigin`] except that it
         * can not set the manager account id via `set_manager` call.
         */
        Manager: StorageDescriptor<[], SS58String, true, never>;
        /**
         * The block number at which the migration began and the pallet's extrinsics were locked.
         *
         * This value is set when entering the `WaitingForAh` stage, i.e., when
         * `RcMigrationStage::is_ongoing()` becomes `true`.
         */
        MigrationStartBlock: StorageDescriptor<[], number, true, never>;
        /**
         * Block number when migration finished and extrinsics were unlocked.
         *
         * This is set when entering the `MigrationDone` stage hence when
         * `RcMigrationStage::is_finished()` becomes `true`.
         */
        MigrationEndBlock: StorageDescriptor<[], number, true, never>;
    };
};
type ICalls = {
    System: {
        /**
         * Make some on-chain remark.
         *
         * Can be executed by every `origin`.
         */
        remark: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>;
        /**
         * Set the number of pages in the WebAssembly environment's heap.
         */
        set_heap_pages: TxDescriptor<Anonymize<I4adgbll7gku4i>>;
        /**
         * Set the new runtime code.
         */
        set_code: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
        /**
         * Set the new runtime code without doing any checks of the given `code`.
         *
         * Note that runtime upgrades will not run if this is called with a not-increasing spec
         * version!
         */
        set_code_without_checks: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
        /**
         * Set some items of storage.
         */
        set_storage: TxDescriptor<Anonymize<I9pj91mj79qekl>>;
        /**
         * Kill some items from storage.
         */
        kill_storage: TxDescriptor<Anonymize<I39uah9nss64h9>>;
        /**
         * Kill all storage items with a key that starts with the given prefix.
         *
         * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
         * the prefix we are removing to accurately calculate the weight of this function.
         */
        kill_prefix: TxDescriptor<Anonymize<Ik64dknsq7k08>>;
        /**
         * Make some on-chain remark and emit event.
         */
        remark_with_event: TxDescriptor<Anonymize<I8ofcg5rbj0g2c>>;
        /**
        
         */
        do_task: TxDescriptor<Anonymize<I3m5sq54sjdlso>>;
        /**
         * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
         * later.
         *
         * This call requires Root origin.
         */
        authorize_upgrade: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
        /**
         * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
         * later.
         *
         * WARNING: This authorizes an upgrade that will take place without any safety checks, for
         * example that the spec name remains the same and that the version number increases. Not
         * recommended for normal use. Use `authorize_upgrade` instead.
         *
         * This call requires Root origin.
         */
        authorize_upgrade_without_checks: TxDescriptor<Anonymize<Ib51vk42m1po4n>>;
        /**
         * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
         *
         * If the authorization required a version check, this call will ensure the spec name
         * remains unchanged and that the spec version has increased.
         *
         * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
         * the new `code` in the same block or attempt to schedule the upgrade.
         *
         * All origins are allowed.
         */
        apply_authorized_upgrade: TxDescriptor<Anonymize<I6pjjpfvhvcfru>>;
    };
    ParachainSystem: {
        /**
         * Set the current validation data.
         *
         * This should be invoked exactly once per block. It will panic at the finalization
         * phase if the call was not invoked.
         *
         * The dispatch origin for this call must be `Inherent`
         *
         * As a side effect, this function upgrades the current validation function
         * if the appropriate time has come.
         */
        set_validation_data: TxDescriptor<Anonymize<Ial23jn8hp0aen>>;
        /**
        
         */
        sudo_send_upward_message: TxDescriptor<Anonymize<Ifpj261e8s63m3>>;
    };
    Timestamp: {
        /**
         * Set the current time.
         *
         * This call should be invoked exactly once per block. It will panic at the finalization
         * phase, if this call hasn't been invoked by that time.
         *
         * The timestamp should be greater than the previous one by the amount specified by
         * [`Config::MinimumPeriod`].
         *
         * The dispatch origin for this call must be _None_.
         *
         * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
         * that changing the complexity of this call could result exhausting the resources in a
         * block to execute any other calls.
         *
         * ## Complexity
         * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
         * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
         * `on_finalize`)
         * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
         */
        set: TxDescriptor<Anonymize<Idcr6u6361oad9>>;
    };
    Preimage: {
        /**
         * Register a preimage on-chain.
         *
         * If the preimage was previously requested, no fees or deposits are taken for providing
         * the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
         */
        note_preimage: TxDescriptor<Anonymize<I82nfqfkd48n10>>;
        /**
         * Clear an unrequested preimage from the runtime storage.
         *
         * If `len` is provided, then it will be a much cheaper operation.
         *
         * - `hash`: The hash of the preimage to be removed from the store.
         * - `len`: The length of the preimage of `hash`.
         */
        unnote_preimage: TxDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * Request a preimage be uploaded to the chain without paying any fees or deposits.
         *
         * If the preimage requests has already been provided on-chain, we unreserve any deposit
         * a user may have paid, and take the control of the preimage out of their hands.
         */
        request_preimage: TxDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * Clear a previously made request for a preimage.
         *
         * NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
         */
        unrequest_preimage: TxDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * Ensure that the bulk of pre-images is upgraded.
         *
         * The caller pays no fee if at least 90% of pre-images were successfully updated.
         */
        ensure_updated: TxDescriptor<Anonymize<I3o5j3bli1pd8e>>;
    };
    Scheduler: {
        /**
         * Anonymously schedule a task.
         */
        schedule: TxDescriptor<Anonymize<I4t62p70pnntsd>>;
        /**
         * Cancel an anonymously scheduled task.
         */
        cancel: TxDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Schedule a named task.
         */
        schedule_named: TxDescriptor<Anonymize<I7jmko1jaasivn>>;
        /**
         * Cancel a named scheduled task.
         */
        cancel_named: TxDescriptor<Anonymize<Ifs1i5fk9cqvr6>>;
        /**
         * Anonymously schedule a task after a delay.
         */
        schedule_after: TxDescriptor<Anonymize<Ic9r6veqrbd54j>>;
        /**
         * Schedule a named task after a delay.
         */
        schedule_named_after: TxDescriptor<Anonymize<Ic096s1vvk47qc>>;
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        set_retry: TxDescriptor<Anonymize<Ieg3fd8p4pkt10>>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        set_retry_named: TxDescriptor<Anonymize<I8kg5ll427kfqq>>;
        /**
         * Removes the retry configuration of a task.
         */
        cancel_retry: TxDescriptor<Anonymize<I467333262q1l9>>;
        /**
         * Cancel the retry configuration of a named task.
         */
        cancel_retry_named: TxDescriptor<Anonymize<Ifs1i5fk9cqvr6>>;
    };
    Parameters: {
        /**
         * Set the value of a parameter.
         *
         * The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
         * deleted by setting them to `None`.
         */
        set_parameter: TxDescriptor<Anonymize<I6usrkf9la6hg2>>;
    };
    Balances: {
        /**
         * Transfer some liquid free balance to another account.
         *
         * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
         * If the sender's account is below the existential deposit as a result
         * of the transfer, the account will be reaped.
         *
         * The dispatch origin for this call must be `Signed` by the transactor.
         */
        transfer_allow_death: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>;
        /**
         * Exactly as `transfer_allow_death`, except the origin must be root and the source account
         * may be specified.
         */
        force_transfer: TxDescriptor<Anonymize<I9bqtpv2ii35mp>>;
        /**
         * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
         * kill the origin account.
         *
         * 99% of the time you want [`transfer_allow_death`] instead.
         *
         * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I4ktuaksf5i1gk>>;
        /**
         * Transfer the entire transferable balance from the caller account.
         *
         * NOTE: This function only attempts to transfer _transferable_ balances. This means that
         * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
         * transferred by this function. To ensure that this function results in a killed account,
         * you might need to prepare the account by removing any reference counters, storage
         * deposits, etc...
         *
         * The dispatch origin of this call must be Signed.
         *
         * - `dest`: The recipient of the transfer.
         * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
         * of the funds the account has, causing the sender account to be killed (false), or
         * transfer everything except at least the existential deposit, which will guarantee to
         * keep the sender account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<I9j7pagd6d4bda>>;
        /**
         * Unreserve some balance from a user by force.
         *
         * Can only be called by ROOT.
         */
        force_unreserve: TxDescriptor<Anonymize<I2h9pmio37r7fb>>;
        /**
         * Upgrade a specified account.
         *
         * - `origin`: Must be `Signed`.
         * - `who`: The account to be upgraded.
         *
         * This will waive the transaction fee if at least all but 10% of the accounts needed to
         * be upgraded. (We let some not have to be upgraded just in order to allow for the
         * possibility of churn).
         */
        upgrade_accounts: TxDescriptor<Anonymize<Ibmr18suc9ikh9>>;
        /**
         * Set the regular balance of a given account.
         *
         * The dispatch origin for this call is `root`.
         */
        force_set_balance: TxDescriptor<Anonymize<I9iq22t0burs89>>;
        /**
         * Adjust the total issuance in a saturating way.
         *
         * Can only be called by root and always needs a positive `delta`.
         *
         * # Example
         */
        force_adjust_total_issuance: TxDescriptor<Anonymize<I5u8olqbbvfnvf>>;
        /**
         * Burn the specified liquid free balance from the origin account.
         *
         * If the origin's account ends up below the existential deposit as a result
         * of the burn and `keep_alive` is false, the account will be reaped.
         *
         * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
         * this `burn` operation will reduce total issuance by the amount _burned_.
         */
        burn: TxDescriptor<Anonymize<I5utcetro501ir>>;
    };
    Vesting: {
        /**
         * Unlock any vested funds of the sender account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have funds still
         * locked under this pallet.
         *
         * Emits either `VestingCompleted` or `VestingUpdated`.
         *
         * ## Complexity
         * - `O(1)`.
         */
        vest: TxDescriptor<undefined>;
        /**
         * Unlock any vested funds of a `target` account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `target`: The account whose vested funds should be unlocked. Must have funds still
         * locked under this pallet.
         *
         * Emits either `VestingCompleted` or `VestingUpdated`.
         *
         * ## Complexity
         * - `O(1)`.
         */
        vest_other: TxDescriptor<Anonymize<Id9uqtigc0il3v>>;
        /**
         * Create a vested transfer.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `target`: The account receiving the vested funds.
         * - `schedule`: The vesting schedule attached to the transfer.
         *
         * Emits `VestingCreated`.
         *
         * NOTE: This will unlock all schedules through the current block.
         *
         * ## Complexity
         * - `O(1)`.
         */
        vested_transfer: TxDescriptor<Anonymize<Iaa2o6cgjdpdn5>>;
        /**
         * Force a vested transfer.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `source`: The account whose funds should be transferred.
         * - `target`: The account that should be transferred the vested funds.
         * - `schedule`: The vesting schedule attached to the transfer.
         *
         * Emits `VestingCreated`.
         *
         * NOTE: This will unlock all schedules through the current block.
         *
         * ## Complexity
         * - `O(1)`.
         */
        force_vested_transfer: TxDescriptor<Anonymize<Iam6hrl7ptd85l>>;
        /**
         * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
         * the highest possible start and end blocks. If both schedules have already started the
         * current block will be used as the schedule start; with the caveat that if one schedule
         * is finished by the current block, the other will be treated as the new merged schedule,
         * unmodified.
         *
         * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
         * NOTE: This will unlock all schedules through the current block prior to merging.
         * NOTE: If both schedules have ended by the current block, no new schedule will be created
         * and both will be removed.
         *
         * Merged schedule attributes:
         * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
         * current_block)`.
         * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
         * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `schedule1_index`: index of the first schedule to merge.
         * - `schedule2_index`: index of the second schedule to merge.
         */
        merge_schedules: TxDescriptor<Anonymize<Ict9ivhr2c5hv0>>;
        /**
         * Force remove a vesting schedule
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `target`: An account that has a vesting schedule
         * - `schedule_index`: The vesting schedule index that should be removed
         */
        force_remove_vesting_schedule: TxDescriptor<Anonymize<I8t4vv03357lk9>>;
    };
    Claims: {
        /**
         * Make a claim to collect your DOTs.
         *
         * The dispatch origin for this call must be _None_.
         *
         * Unsigned Validation:
         * A call to claim is deemed valid if the signature provided matches
         * the expected signed message of:
         *
         * > Ethereum Signed Message:
         * > (configured prefix string)(address)
         *
         * and `address` matches the `dest` account.
         *
         * Parameters:
         * - `dest`: The destination account to payout the claim.
         * - `ethereum_signature`: The signature of an ethereum signed message matching the format
         * described above.
         *
         * <weight>
         * The weight of this call is invariant over the input parameters.
         * Weight includes logic to validate unsigned `claim` call.
         *
         * Total Complexity: O(1)
         * </weight>
         */
        claim: TxDescriptor<Anonymize<I6uag8j5aql8q>>;
        /**
         * Mint a new claim to collect DOTs.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * Parameters:
         * - `who`: The Ethereum address allowed to collect this claim.
         * - `value`: The number of DOTs that will be claimed.
         * - `vesting_schedule`: An optional vesting schedule for these DOTs.
         *
         * <weight>
         * The weight of this call is invariant over the input parameters.
         * We assume worst case that both vesting and statement is being inserted.
         *
         * Total Complexity: O(1)
         * </weight>
         */
        mint_claim: TxDescriptor<Anonymize<Isq3k9rh2c0l4>>;
        /**
         * Make a claim to collect your DOTs by signing a statement.
         *
         * The dispatch origin for this call must be _None_.
         *
         * Unsigned Validation:
         * A call to `claim_attest` is deemed valid if the signature provided matches
         * the expected signed message of:
         *
         * > Ethereum Signed Message:
         * > (configured prefix string)(address)(statement)
         *
         * and `address` matches the `dest` account; the `statement` must match that which is
         * expected according to your purchase arrangement.
         *
         * Parameters:
         * - `dest`: The destination account to payout the claim.
         * - `ethereum_signature`: The signature of an ethereum signed message matching the format
         * described above.
         * - `statement`: The identity of the statement which is being attested to in the
         * signature.
         *
         * <weight>
         * The weight of this call is invariant over the input parameters.
         * Weight includes logic to validate unsigned `claim_attest` call.
         *
         * Total Complexity: O(1)
         * </weight>
         */
        claim_attest: TxDescriptor<Anonymize<I1dqiovk0tpoah>>;
        /**
         * Attest to a statement, needed to finalize the claims process.
         *
         * WARNING: Insecure unless your chain includes `PrevalidateAttests` as a
         * `TransactionExtension`.
         *
         * Unsigned Validation:
         * A call to attest is deemed valid if the sender has a `Preclaim` registered
         * and provides a `statement` which is expected for the account.
         *
         * Parameters:
         * - `statement`: The identity of the statement which is being attested to in the
         * signature.
         *
         * <weight>
         * The weight of this call is invariant over the input parameters.
         * Weight includes logic to do pre-validation on `attest` call.
         *
         * Total Complexity: O(1)
         * </weight>
         */
        attest: TxDescriptor<Anonymize<I1ntko0oih7v1a>>;
        /**
        
         */
        move_claim: TxDescriptor<Anonymize<I2tf5qmg09624f>>;
    };
    CollatorSelection: {
        /**
         * Set the list of invulnerable (fixed) collators. These collators must do some
         * preparation, namely to have registered session keys.
         *
         * The call will remove any accounts that have not registered keys from the set. That is,
         * it is non-atomic; the caller accepts all `AccountId`s passed in `new` _individually_ as
         * acceptable Invulnerables, and is not proposing a _set_ of new Invulnerables.
         *
         * This call does not maintain mutual exclusivity of `Invulnerables` and `Candidates`. It
         * is recommended to use a batch of `add_invulnerable` and `remove_invulnerable` instead. A
         * `batch_all` can also be used to enforce atomicity. If any candidates are included in
         * `new`, they should be removed with `remove_invulnerable_candidate` after execution.
         *
         * Must be called by the `UpdateOrigin`.
         */
        set_invulnerables: TxDescriptor<Anonymize<Ifccifqltb5obi>>;
        /**
         * Set the ideal number of non-invulnerable collators. If lowering this number, then the
         * number of running collators could be higher than this figure. Aside from that edge case,
         * there should be no other way to have more candidates than the desired number.
         *
         * The origin for this call must be the `UpdateOrigin`.
         */
        set_desired_candidates: TxDescriptor<Anonymize<Iadtsfv699cq8b>>;
        /**
         * Set the candidacy bond amount.
         *
         * If the candidacy bond is increased by this call, all current candidates which have a
         * deposit lower than the new bond will be kicked from the list and get their deposits
         * back.
         *
         * The origin for this call must be the `UpdateOrigin`.
         */
        set_candidacy_bond: TxDescriptor<Anonymize<Ialpmgmhr3gk5r>>;
        /**
         * Register this account as a collator candidate. The account must (a) already have
         * registered session keys and (b) be able to reserve the `CandidacyBond`.
         *
         * This call is not available to `Invulnerable` collators.
         */
        register_as_candidate: TxDescriptor<undefined>;
        /**
         * Deregister `origin` as a collator candidate. Note that the collator can only leave on
         * session change. The `CandidacyBond` will be unreserved immediately.
         *
         * This call will fail if the total number of candidates would drop below
         * `MinEligibleCollators`.
         */
        leave_intent: TxDescriptor<undefined>;
        /**
         * Add a new account `who` to the list of `Invulnerables` collators. `who` must have
         * registered session keys. If `who` is a candidate, they will be removed.
         *
         * The origin for this call must be the `UpdateOrigin`.
         */
        add_invulnerable: TxDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * Remove an account `who` from the list of `Invulnerables` collators. `Invulnerables` must
         * be sorted.
         *
         * The origin for this call must be the `UpdateOrigin`.
         */
        remove_invulnerable: TxDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * Update the candidacy bond of collator candidate `origin` to a new amount `new_deposit`.
         *
         * Setting a `new_deposit` that is lower than the current deposit while `origin` is
         * occupying a top-`DesiredCandidates` slot is not allowed.
         *
         * This call will fail if `origin` is not a collator candidate, the updated bond is lower
         * than the minimum candidacy bond, and/or the amount cannot be reserved.
         */
        update_bond: TxDescriptor<Anonymize<I3sdol54kg5jaq>>;
        /**
         * The caller `origin` replaces a candidate `target` in the collator candidate list by
         * reserving `deposit`. The amount `deposit` reserved by the caller must be greater than
         * the existing bond of the target it is trying to replace.
         *
         * This call will fail if the caller is already a collator candidate or invulnerable, the
         * caller does not have registered session keys, the target is not a collator candidate,
         * and/or the `deposit` amount cannot be reserved.
         */
        take_candidate_slot: TxDescriptor<Anonymize<I8fougodaj6di6>>;
    };
    Session: {
        /**
         * Sets the session key(s) of the function caller to `keys`.
         * Allows an account to set its session key prior to becoming a validator.
         * This doesn't take effect until the next session.
         *
         * The dispatch origin of this function must be signed.
         *
         * ## Complexity
         * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
         * fixed.
         */
        set_keys: TxDescriptor<Anonymize<I81vt5eq60l4b6>>;
        /**
         * Removes any session key(s) of the function caller.
         *
         * This doesn't take effect until the next session.
         *
         * The dispatch origin of this function must be Signed and the account must be either be
         * convertible to a validator ID using the chain's typical addressing system (this usually
         * means being a controller account) or directly convertible into a validator ID (which
         * usually means being a stash account).
         *
         * ## Complexity
         * - `O(1)` in number of key types. Actual cost depends on the number of length of
         * `T::Keys::key_ids()` which is fixed.
         */
        purge_keys: TxDescriptor<undefined>;
    };
    XcmpQueue: {
        /**
         * Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
         *
         * - `origin`: Must pass `ControllerOrigin`.
         */
        suspend_xcm_execution: TxDescriptor<undefined>;
        /**
         * Resumes all XCM executions for the XCMP queue.
         *
         * Note that this function doesn't change the status of the in/out bound channels.
         *
         * - `origin`: Must pass `ControllerOrigin`.
         */
        resume_xcm_execution: TxDescriptor<undefined>;
        /**
         * Overwrites the number of pages which must be in the queue for the other side to be
         * told to suspend their sending.
         *
         * - `origin`: Must pass `Root`.
         * - `new`: Desired value for `QueueConfigData.suspend_value`
         */
        update_suspend_threshold: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Overwrites the number of pages which must be in the queue after which we drop any
         * further messages from the channel.
         *
         * - `origin`: Must pass `Root`.
         * - `new`: Desired value for `QueueConfigData.drop_threshold`
         */
        update_drop_threshold: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Overwrites the number of pages which the queue must be reduced to before it signals
         * that message sending may recommence after it has been suspended.
         *
         * - `origin`: Must pass `Root`.
         * - `new`: Desired value for `QueueConfigData.resume_threshold`
         */
        update_resume_threshold: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
    };
    PolkadotXcm: {
        /**
        
         */
        send: TxDescriptor<Anonymize<Ia5cotcvi888ln>>;
        /**
         * Teleport some assets from the local chain to some destination chain.
         *
         * **This function is deprecated: Use `limited_teleport_assets` instead.**
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
         * with all fees taken as needed from the asset.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` chain.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         */
        teleport_assets: TxDescriptor<Anonymize<I21jsa919m88fd>>;
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve.
         *
         * `assets` must have same reserve location and may not be teleportable to `dest`.
         * - `assets` have local reserve: transfer assets to sovereign account of destination
         * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
         * assets to `beneficiary`.
         * - `assets` have destination reserve: burn local assets and forward a notification to
         * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
         * deposit them to `beneficiary`.
         * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
         * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
         * to mint and deposit reserve-based assets to `beneficiary`.
         *
         * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
         * with all fees taken as needed from the asset.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         */
        reserve_transfer_assets: TxDescriptor<Anonymize<I21jsa919m88fd>>;
        /**
         * Execute an XCM message from a local, signed, origin.
         *
         * An event is deposited indicating whether `msg` could be executed completely or only
         * partially.
         *
         * No more than `max_weight` will be used in its attempted execution. If this is less than
         * the maximum amount of weight that the message could take to be executed, then no
         * execution attempt will be made.
         */
        execute: TxDescriptor<Anonymize<Iegif7m3upfe1k>>;
        /**
         * Extoll that a particular destination can be communicated with through a particular
         * version of XCM.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `location`: The destination that is being described.
         * - `xcm_version`: The latest version of XCM that `location` supports.
         */
        force_xcm_version: TxDescriptor<Anonymize<I9kt8c221c83ln>>;
        /**
         * Set a safe XCM version (the version that XCM should be encoded with if the most recent
         * version a destination can accept is unknown).
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
         */
        force_default_xcm_version: TxDescriptor<Anonymize<Ic76kfh5ebqkpl>>;
        /**
         * Ask a location to notify us regarding their XCM version and any changes to it.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `location`: The location to which we should subscribe for XCM version notifications.
         */
        force_subscribe_version_notify: TxDescriptor<Anonymize<Icscpmubum33bq>>;
        /**
         * Require that a particular destination should no longer notify us regarding any XCM
         * version changes.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `location`: The location to which we are currently subscribed for XCM version
         * notifications which we no longer desire.
         */
        force_unsubscribe_version_notify: TxDescriptor<Anonymize<Icscpmubum33bq>>;
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve.
         *
         * `assets` must have same reserve location and may not be teleportable to `dest`.
         * - `assets` have local reserve: transfer assets to sovereign account of destination
         * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
         * assets to `beneficiary`.
         * - `assets` have destination reserve: burn local assets and forward a notification to
         * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
         * deposit them to `beneficiary`.
         * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
         * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
         * to mint and deposit reserve-based assets to `beneficiary`.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
         * is needed than `weight_limit`, then the operation will fail and the sent assets may be
         * at risk.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        limited_reserve_transfer_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
        /**
         * Teleport some assets from the local chain to some destination chain.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
         * is needed than `weight_limit`, then the operation will fail and the sent assets may be
         * at risk.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` chain.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        limited_teleport_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
        /**
         * Set or unset the global suspension state of the XCM executor.
         *
         * - `origin`: Must be an origin specified by AdminOrigin.
         * - `suspended`: `true` to suspend, `false` to resume.
         */
        force_suspension: TxDescriptor<Anonymize<Ibgm4rnf22lal1>>;
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve, or through teleports.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
         * `weight_limit` of weight. If more weight is needed than `weight_limit`, then the
         * operation will fail and the sent assets may be at risk.
         *
         * `assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
         * to `dest`, no limitations imposed on `fees`.
         * - for local reserve: transfer assets to sovereign account of destination chain and
         * forward a notification XCM to `dest` to mint and deposit reserve-based assets to
         * `beneficiary`.
         * - for destination reserve: burn local assets and forward a notification to `dest` chain
         * to withdraw the reserve assets from this chain's sovereign account and deposit them
         * to `beneficiary`.
         * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
         * from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
         * and deposit reserve-based assets to `beneficiary`.
         * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
         * assets and deposit them to `beneficiary`.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `X2(Parent,
         * Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
         * from relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        transfer_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
        /**
         * Claims assets trapped on this pallet because of leftover assets during XCM execution.
         *
         * - `origin`: Anyone can call this extrinsic.
         * - `assets`: The exact assets that were trapped. Use the version to specify what version
         * was the latest when they were trapped.
         * - `beneficiary`: The location/account where the claimed assets will be deposited.
         */
        claim_assets: TxDescriptor<Anonymize<Ie68np0vpihith>>;
        /**
         * Transfer assets from the local chain to the destination chain using explicit transfer
         * types for assets and fees.
         *
         * `assets` must have same reserve location or may be teleportable to `dest`. Caller must
         * provide the `assets_transfer_type` to be used for `assets`:
         * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
         * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
         * assets to `beneficiary`.
         * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
         * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
         * deposit them to `beneficiary`.
         * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
         * chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
         * XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
         * the remote `reserve` is Asset Hub.
         * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
         * mint/teleport assets and deposit them to `beneficiary`.
         *
         * On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
         * buy execution using transferred `assets` identified by `remote_fees_id`.
         * Make sure enough of the specified `remote_fees_id` asset is included in the given list
         * of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
         * is needed than `weight_limit`, then the operation will fail and the sent assets may be
         * at risk.
         *
         * `remote_fees_id` may use different transfer type than rest of `assets` and can be
         * specified through `fees_transfer_type`.
         *
         * The caller needs to specify what should happen to the transferred assets once they reach
         * the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
         * contains the instructions to execute on `dest` as a final step.
         * This is usually as simple as:
         * `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
         * but could be something more exotic like sending the `assets` even further.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `[Parent,
         * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
         * relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
         * parachain across a bridge to another ecosystem destination.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
         * - `remote_fees_id`: One of the included `assets` to be used to pay fees.
         * - `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
         * - `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
         * transfer, which also determines what happens to the assets on the destination chain.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        transfer_assets_using_type_and_then: TxDescriptor<Anonymize<I9bnv6lu0crf1q>>;
        /**
         * Authorize another `aliaser` location to alias into the local `origin` making this call.
         * The `aliaser` is only authorized until the provided `expiry` block number.
         * The call can also be used for a previously authorized alias in order to update its
         * `expiry` block number.
         *
         * Usually useful to allow your local account to be aliased into from a remote location
         * also under your control (like your account on another chain).
         *
         * WARNING: make sure the caller `origin` (you) trusts the `aliaser` location to act in
         * their/your name. Once authorized using this call, the `aliaser` can freely impersonate
         * `origin` in XCM programs executed on the local chain.
         */
        add_authorized_alias: TxDescriptor<Anonymize<Iauhjqifrdklq7>>;
        /**
         * Remove a previously authorized `aliaser` from the list of locations that can alias into
         * the local `origin` making this call.
         */
        remove_authorized_alias: TxDescriptor<Anonymize<Ie1uso9m8rt5cf>>;
        /**
         * Remove all previously authorized `aliaser`s that can alias into the local `origin`
         * making this call.
         */
        remove_all_authorized_aliases: TxDescriptor<undefined>;
    };
    ToKusamaXcmRouter: {
        /**
         * Notification about congested bridge queue.
         */
        report_bridge_status: TxDescriptor<Anonymize<Idlampfle3vh6q>>;
    };
    MessageQueue: {
        /**
         * Remove a page which has no more messages remaining to be processed or is stale.
         */
        reap_page: TxDescriptor<Anonymize<I40pqum1mu8qg3>>;
        /**
         * Execute an overweight message.
         *
         * Temporary processing errors will be propagated whereas permanent errors are treated
         * as success condition.
         *
         * - `origin`: Must be `Signed`.
         * - `message_origin`: The origin from which the message to be executed arrived.
         * - `page`: The page in the queue in which the message to be executed is sitting.
         * - `index`: The index into the queue of the message to be executed.
         * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
         * of the message.
         *
         * Benchmark complexity considerations: O(index + weight_limit).
         */
        execute_overweight: TxDescriptor<Anonymize<I1r4c2ghbtvjuc>>;
    };
    SnowbridgeSystemFrontend: {
        /**
         * Set the operating mode for exporting messages to Ethereum.
         */
        set_operating_mode: TxDescriptor<Anonymize<I9i6b1362umn1t>>;
        /**
         * Initiates the registration for a Polkadot-native token as a wrapped ERC20 token on
         * Ethereum.
         * - `asset_id`: Location of the asset
         * - `metadata`: Metadata to include in the instantiated ERC20 contract on Ethereum
         *
         * All origins are allowed, however `asset_id` must be a location nested within the origin
         * consensus system.
         */
        register_token: TxDescriptor<Anonymize<Iel0ml15497i7b>>;
        /**
         * Add an additional relayer tip for a committed message identified by `message_id`.
         * The tip asset will be swapped for ether.
         */
        add_tip: TxDescriptor<Anonymize<Icp5j0naoi9qh2>>;
    };
    Utility: {
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        batch: TxDescriptor<Anonymize<I3su49r978d1jv>>;
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        as_derivative: TxDescriptor<Anonymize<Id4rd98rpm3lsm>>;
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        batch_all: TxDescriptor<Anonymize<I3su49r978d1jv>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        dispatch_as: TxDescriptor<Anonymize<I7keitt825v44l>>;
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        force_batch: TxDescriptor<Anonymize<I3su49r978d1jv>>;
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        with_weight: TxDescriptor<Anonymize<I8m94rr7prdld2>>;
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        if_else: TxDescriptor<Anonymize<I5d97jj7jsh708>>;
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        dispatch_as_fallible: TxDescriptor<Anonymize<I7keitt825v44l>>;
    };
    Multisig: {
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        as_multi_threshold_1: TxDescriptor<Anonymize<I1e1rtve4qeedc>>;
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        as_multi: TxDescriptor<Anonymize<I2tarfpsmmt2h4>>;
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        approve_as_multi: TxDescriptor<Anonymize<Ideaemvoneh309>>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        cancel_as_multi: TxDescriptor<Anonymize<I3d9o9d7epp66v>>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        poke_deposit: TxDescriptor<Anonymize<I6lqh1vgb4mcja>>;
    };
    Proxy: {
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        proxy: TxDescriptor<Anonymize<I5heniluodu9s7>>;
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        add_proxy: TxDescriptor<Anonymize<I1f5npkhqt8edf>>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        remove_proxy: TxDescriptor<Anonymize<I1f5npkhqt8edf>>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `create_pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        remove_proxies: TxDescriptor<undefined>;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        create_pure: TxDescriptor<Anonymize<Ick1e7hpegm7nq>>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `create_pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `create_pure` to create this account.
         * - `index`: The disambiguation index originally passed to `create_pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `create_pure`.
         * - `height`: The height of the chain when the call to `create_pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `create_pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `create_pure` call has corresponding parameters.
         */
        kill_pure: TxDescriptor<Anonymize<Ickilojujmtbr4>>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        announce: TxDescriptor<Anonymize<I2eb501t8s6hsq>>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        remove_announcement: TxDescriptor<Anonymize<I2eb501t8s6hsq>>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        reject_announcement: TxDescriptor<Anonymize<Ianmuoljk2sk1u>>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        proxy_announced: TxDescriptor<Anonymize<If2e5kdjq9qh3s>>;
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        poke_deposit: TxDescriptor<undefined>;
    };
    Indices: {
        /**
         * Assign an previously unassigned index.
         *
         * Payment: `Deposit` is reserved from the sender account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `index`: the index to be claimed. This must not be in use.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        claim: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Assign an index already owned by the sender to another account. The balance reservation
         * is effectively transferred to the new account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `index`: the index to be re-assigned. This must be owned by the sender.
         * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        transfer: TxDescriptor<Anonymize<I6o1er683vod1j>>;
        /**
         * Free up an index owned by the sender.
         *
         * Payment: Any previous deposit placed for the index is unreserved in the sender account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must own the index.
         *
         * - `index`: the index to be freed. This must be owned by the sender.
         *
         * Emits `IndexFreed` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        free: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Force an index to an account. This doesn't require a deposit. If the index is already
         * held, then any deposit is reimbursed to its current owner.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `index`: the index to be (re-)assigned.
         * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
         * - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        force_transfer: TxDescriptor<Anonymize<I5bq561t4gpfva>>;
        /**
         * Freeze an index so it will always point to the sender account. This consumes the
         * deposit.
         *
         * The dispatch origin for this call must be _Signed_ and the signing account must have a
         * non-frozen account `index`.
         *
         * - `index`: the index to be frozen in place.
         *
         * Emits `IndexFrozen` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        freeze: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Poke the deposit reserved for an index.
         *
         * The dispatch origin for this call must be _Signed_ and the signing account must have a
         * non-frozen account `index`.
         *
         * The transaction fees is waived if the deposit is changed after poking/reconsideration.
         *
         * - `index`: the index whose deposit is to be poked/reconsidered.
         *
         * Emits `DepositPoked` if successful.
         */
        poke_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
    };
    Assets: {
        /**
         * Issue a new class of fungible assets from a public origin.
         *
         * This new asset class has no assets initially and its owner is the origin.
         *
         * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
         *
         * Funds of sender are reserved by `AssetDeposit`.
         *
         * Parameters:
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `admin`: The admin of this class of assets. The admin is the initial address of each
         * member of the asset class's admin team.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `Created` event when successful.
         *
         * Weight: `O(1)`
         */
        create: TxDescriptor<Anonymize<Ic357tcepuvo5c>>;
        /**
         * Issue a new class of fungible assets from a privileged origin.
         *
         * This new asset class has no assets initially.
         *
         * The origin must conform to `ForceOrigin`.
         *
         * Unlike `create`, no funds are reserved.
         *
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `owner`: The owner of this class of assets. The owner has full superuser permissions
         * over this asset, but may later change and configure the permissions using
         * `transfer_ownership` and `set_team`.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `ForceCreated` event when successful.
         *
         * Weight: `O(1)`
         */
        force_create: TxDescriptor<Anonymize<I2rnoam876ruhj>>;
        /**
         * Start the process of destroying a fungible asset class.
         *
         * `start_destroy` is the first in a series of extrinsics that should be called, to allow
         * destruction of an asset class.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * an account contains holds or freezes in place.
         */
        start_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Destroy all accounts associated with a given asset.
         *
         * `destroy_accounts` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedAccounts` event.
         */
        destroy_accounts: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
         *
         * `destroy_approvals` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedApprovals` event.
         */
        destroy_approvals: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Complete destroying asset and unreserve currency.
         *
         * `finish_destroy` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
         * hand.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each successful call emits the `Event::Destroyed` event.
         */
        finish_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Mint assets of a particular class.
         *
         * The origin must be Signed and the sender must be the Issuer of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount minted.
         * - `beneficiary`: The account to be credited with the minted assets.
         * - `amount`: The amount of the asset to be minted.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
         */
        mint: TxDescriptor<Anonymize<Ib3qnc19gu633c>>;
        /**
         * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
         *
         * Origin must be Signed and the sender should be the Manager of the asset `id`.
         *
         * Bails with `NoAccount` if the `who` is already dead.
         *
         * - `id`: The identifier of the asset to have some amount burned.
         * - `who`: The account to be debited from.
         * - `amount`: The maximum amount by which `who`'s balance should be reduced.
         *
         * Emits `Burned` with the actual amount burned. If this takes the balance to below the
         * minimum for the asset, then the amount burned is increased to take it to zero.
         *
         * Weight: `O(1)`
         * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
         */
        burn: TxDescriptor<Anonymize<Ifira6u9hi7cu1>>;
        /**
         * Move some assets from the sender account to another.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer: TxDescriptor<Anonymize<I72tqocvdoqfff>>;
        /**
         * Move some assets from the sender account to another, keeping the sender account alive.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I72tqocvdoqfff>>;
        /**
         * Move some assets from one account to another.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `source`: The account to be debited.
         * - `dest`: The account to be credited.
         * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
         * `dest`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the `source` balance above zero but
         * below the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
         * `dest`.
         */
        force_transfer: TxDescriptor<Anonymize<I2i27f3sfmvc05>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
         * must already exist as an entry in `Account`s of the asset. If you want to freeze an
         * account that does not have an entry, use `touch_other` first.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Allow unprivileged transfers to and from an account again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be unfrozen.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Disallow further unprivileged transfers for the asset class.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Allow unprivileged transfers for the asset again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be thawed.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Change the Owner of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        transfer_ownership: TxDescriptor<Anonymize<I3abtumcmempjs>>;
        /**
         * Change the Issuer, Admin and Freezer of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         *
         * Emits `TeamChanged`.
         *
         * Weight: `O(1)`
         */
        set_team: TxDescriptor<Anonymize<Id81m8flopt8ha>>;
        /**
         * Set the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Funds of sender are reserved according to the formula:
         * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
         * account any already reserved funds.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_metadata: TxDescriptor<Anonymize<I8hff7chabggkd>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Any deposit is freed for the asset owner.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Force the metadata for an asset to some value.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is left alone.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
         */
        force_set_metadata: TxDescriptor<Anonymize<I49i39mtj1ivbs>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is returned.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        force_clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Alter the attributes of a given asset.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
         * value to account for the state bloat associated with its balance storage. If set to
         * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
         * an ED in the Balances pallet or whatever else is used to control user-account state
         * growth).
         * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
         * instructions.
         *
         * Emits `AssetStatusChanged` with the identity of the asset.
         *
         * Weight: `O(1)`
         */
        force_asset_status: TxDescriptor<Anonymize<Ifkr2kcak2vto1>>;
        /**
         * Approve an amount of asset for transfer by a delegated third-party account.
         *
         * Origin must be Signed.
         *
         * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
         * for the purpose of holding the approval. If some non-zero amount of assets is already
         * approved from signing account to `delegate`, then it is topped up or unreserved to
         * meet the right value.
         *
         * NOTE: The signing account does not need to own `amount` of assets at the point of
         * making this call.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account to delegate permission to transfer asset.
         * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
         * already an approval in place, then this acts additively.
         *
         * Emits `ApprovedTransfer` on success.
         *
         * Weight: `O(1)`
         */
        approve_transfer: TxDescriptor<Anonymize<I1ju6r8q0cs9jt>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be Signed and there must be an approval in place between signer and
         * `delegate`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        cancel_approval: TxDescriptor<Anonymize<I4kpeq6j7cd5bu>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
         * account of the asset `id`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        force_cancel_approval: TxDescriptor<Anonymize<I5na1ka76k6811>>;
        /**
         * Transfer some asset balance from a previously delegated account to some third-party
         * account.
         *
         * Origin must be Signed and there must be an approval in place by the `owner` to the
         * signer.
         *
         * If the entire amount approved for transfer is transferred, then any deposit previously
         * reserved by `approve_transfer` is unreserved.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The account which previously approved for a transfer of at least `amount` and
         * from which the asset balance will be withdrawn.
         * - `destination`: The account to which the asset balance of `amount` will be transferred.
         * - `amount`: The amount of assets to transfer.
         *
         * Emits `TransferredApproved` on success.
         *
         * Weight: `O(1)`
         */
        transfer_approved: TxDescriptor<Anonymize<I59mhdb9omdqfa>>;
        /**
         * Create an asset account for non-provider assets.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
         * to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
         * account.
         *
         * The origin must be Signed.
         *
         * - `id`: The identifier of the asset for which the caller would like the deposit
         * refunded.
         * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * the asset account contains holds or freezes in place.
         *
         * Emits `Refunded` event when successful.
         */
        refund: TxDescriptor<Anonymize<I9vl5kpk0fpakt>>;
        /**
         * Sets the minimum balance of an asset.
         *
         * Only works if there aren't any accounts that are holding the asset or if
         * the new value of `min_balance` is less than the old one.
         *
         * Origin must be Signed and the sender has to be the Owner of the
         * asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `min_balance`: The new value of `min_balance`.
         *
         * Emits `AssetMinBalanceChanged` event when successful.
         */
        set_min_balance: TxDescriptor<Anonymize<I717jt61hu19b4>>;
        /**
         * Create an asset account for `who`.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
         * must have sufficient funds for a deposit to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         * - `who`: The account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
         *
         * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
         * order to burn a non-zero balance of the asset, the caller must be the account and should
         * use `refund`.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `who`: The account to refund.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * the asset account contains holds or freezes in place.
         *
         * Emits `Refunded` event when successful.
         */
        refund_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the account's asset.
         * - `who`: The account to be unblocked.
         *
         * Emits `Blocked`.
         *
         * Weight: `O(1)`
         */
        block: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Transfer the entire transferable balance from the caller asset account.
         *
         * NOTE: This function only attempts to transfer _transferable_ balances. This means that
         * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
         * transferred by this function. To ensure that this function results in a killed account,
         * you might need to prepare the account by removing any reference counters, storage
         * deposits, etc...
         *
         * The dispatch origin of this call must be Signed.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `dest`: The recipient of the transfer.
         * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
         * of the funds the asset account has, causing the sender asset account to be killed
         * (false), or transfer everything except at least the minimum balance, which will
         * guarantee to keep the sender asset account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<I7f7v8192r1lmq>>;
    };
    Uniques: {
        /**
         * Issue a new collection of non-fungible items from a public origin.
         *
         * This new collection has no items initially and its owner is the origin.
         *
         * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
         *
         * `ItemDeposit` funds of sender are reserved.
         *
         * Parameters:
         * - `collection`: The identifier of the new collection. This must not be currently in use.
         * - `admin`: The admin of this collection. The admin is the initial address of each
         * member of the collection's admin team.
         *
         * Emits `Created` event when successful.
         *
         * Weight: `O(1)`
         */
        create: TxDescriptor<Anonymize<If66ivi02f7256>>;
        /**
         * Issue a new collection of non-fungible items from a privileged origin.
         *
         * This new collection has no items initially.
         *
         * The origin must conform to `ForceOrigin`.
         *
         * Unlike `create`, no funds are reserved.
         *
         * - `collection`: The identifier of the new item. This must not be currently in use.
         * - `owner`: The owner of this collection of items. The owner has full superuser
         * permissions
         * over this item, but may later change and configure the permissions using
         * `transfer_ownership` and `set_team`.
         *
         * Emits `ForceCreated` event when successful.
         *
         * Weight: `O(1)`
         */
        force_create: TxDescriptor<Anonymize<I223jtcatlfkrc>>;
        /**
         * Destroy a collection of fungible items.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
         * owner of the `collection`.
         *
         * - `collection`: The identifier of the collection to be destroyed.
         * - `witness`: Information on the items minted in the collection. This must be
         * correct.
         *
         * Emits `Destroyed` event when successful.
         *
         * Weight: `O(n + m)` where:
         * - `n = witness.items`
         * - `m = witness.item_metadatas`
         * - `a = witness.attributes`
         */
        destroy: TxDescriptor<Anonymize<I223jg78mng8hq>>;
        /**
         * Mint an item of a particular collection.
         *
         * The origin must be Signed and the sender must be the Issuer of the `collection`.
         *
         * - `collection`: The collection of the item to be minted.
         * - `item`: The item value of the item to be minted.
         * - `beneficiary`: The initial owner of the minted item.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         */
        mint: TxDescriptor<Anonymize<I4iiuiftkpq3fd>>;
        /**
         * Destroy a single item.
         *
         * Origin must be Signed and the signing account must be either:
         * - the Admin of the `collection`;
         * - the Owner of the `item`;
         *
         * - `collection`: The collection of the item to be burned.
         * - `item`: The item of the item to be burned.
         * - `check_owner`: If `Some` then the operation will fail with `WrongOwner` unless the
         * item is owned by this value.
         *
         * Emits `Burned` with the actual amount burned.
         *
         * Weight: `O(1)`
         * Modes: `check_owner.is_some()`.
         */
        burn: TxDescriptor<Anonymize<Ibra6533h92c0a>>;
        /**
         * Move an item from the sender account to another.
         *
         * This resets the approved account of the item.
         *
         * Origin must be Signed and the signing account must be either:
         * - the Admin of the `collection`;
         * - the Owner of the `item`;
         * - the approved delegate for the `item` (in this case, the approval is reset).
         *
         * Arguments:
         * - `collection`: The collection of the item to be transferred.
         * - `item`: The item of the item to be transferred.
         * - `dest`: The account to receive ownership of the item.
         *
         * Emits `Transferred`.
         *
         * Weight: `O(1)`
         */
        transfer: TxDescriptor<Anonymize<Ibgvkh96s68a66>>;
        /**
         * Reevaluate the deposits on some items.
         *
         * Origin must be Signed and the sender should be the Owner of the `collection`.
         *
         * - `collection`: The collection to be frozen.
         * - `items`: The items of the collection whose deposits will be reevaluated.
         *
         * NOTE: This exists as a best-effort function. Any items which are unknown or
         * in the case that the owner account does not have reservable funds to pay for a
         * deposit increase are ignored. Generally the owner isn't going to call this on items
         * whose existing deposit is less than the refreshed deposit as it would only cost them,
         * so it's of little consequence.
         *
         * It will still return an error in the case that the collection is unknown of the signer
         * is not permitted to call it.
         *
         * Weight: `O(items.len())`
         */
        redeposit: TxDescriptor<Anonymize<If9vko7pv0231m>>;
        /**
         * Disallow further unprivileged transfer of an item.
         *
         * Origin must be Signed and the sender should be the Freezer of the `collection`.
         *
         * - `collection`: The collection of the item to be frozen.
         * - `item`: The item of the item to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Re-allow unprivileged transfer of an item.
         *
         * Origin must be Signed and the sender should be the Freezer of the `collection`.
         *
         * - `collection`: The collection of the item to be thawed.
         * - `item`: The item of the item to be thawed.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Disallow further unprivileged transfers for a whole collection.
         *
         * Origin must be Signed and the sender should be the Freezer of the `collection`.
         *
         * - `collection`: The collection to be frozen.
         *
         * Emits `CollectionFrozen`.
         *
         * Weight: `O(1)`
         */
        freeze_collection: TxDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * Re-allow unprivileged transfers for a whole collection.
         *
         * Origin must be Signed and the sender should be the Admin of the `collection`.
         *
         * - `collection`: The collection to be thawed.
         *
         * Emits `CollectionThawed`.
         *
         * Weight: `O(1)`
         */
        thaw_collection: TxDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * Change the Owner of a collection.
         *
         * Origin must be Signed and the sender should be the Owner of the `collection`.
         *
         * - `collection`: The collection whose owner should be changed.
         * - `owner`: The new Owner of this collection. They must have called
         * `set_accept_ownership` with `collection` in order for this operation to succeed.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        transfer_ownership: TxDescriptor<Anonymize<I736lv5q9m5bot>>;
        /**
         * Change the Issuer, Admin and Freezer of a collection.
         *
         * Origin must be Signed and the sender should be the Owner of the `collection`.
         *
         * - `collection`: The collection whose team should be changed.
         * - `issuer`: The new Issuer of this collection.
         * - `admin`: The new Admin of this collection.
         * - `freezer`: The new Freezer of this collection.
         *
         * Emits `TeamChanged`.
         *
         * Weight: `O(1)`
         */
        set_team: TxDescriptor<Anonymize<I1ap9tlenhr44l>>;
        /**
         * Approve an item to be transferred by a delegated third-party account.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be
         * either the owner of the `item` or the admin of the collection.
         *
         * - `collection`: The collection of the item to be approved for delegated transfer.
         * - `item`: The item of the item to be approved for delegated transfer.
         * - `delegate`: The account to delegate permission to transfer the item.
         *
         * Important NOTE: The `approved` account gets reset after each transfer.
         *
         * Emits `ApprovedTransfer` on success.
         *
         * Weight: `O(1)`
         */
        approve_transfer: TxDescriptor<Anonymize<Ib92t90p616grb>>;
        /**
         * Cancel the prior approval for the transfer of an item by a delegate.
         *
         * Origin must be either:
         * - the `Force` origin;
         * - `Signed` with the signer being the Admin of the `collection`;
         * - `Signed` with the signer being the Owner of the `item`;
         *
         * Arguments:
         * - `collection`: The collection of the item of whose approval will be cancelled.
         * - `item`: The item of the item of whose approval will be cancelled.
         * - `maybe_check_delegate`: If `Some` will ensure that the given account is the one to
         * which permission of transfer is delegated.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        cancel_approval: TxDescriptor<Anonymize<Ieipuujd6879do>>;
        /**
         * Alter the attributes of a given item.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `collection`: The identifier of the item.
         * - `owner`: The new Owner of this item.
         * - `issuer`: The new Issuer of this item.
         * - `admin`: The new Admin of this item.
         * - `freezer`: The new Freezer of this item.
         * - `free_holding`: Whether a deposit is taken for holding an item of this collection.
         * - `is_frozen`: Whether this collection is frozen except for permissioned/admin
         * instructions.
         *
         * Emits `ItemStatusChanged` with the identity of the item.
         *
         * Weight: `O(1)`
         */
        force_item_status: TxDescriptor<Anonymize<Ie56eq9sg1rsoc>>;
        /**
         * Set an attribute for a collection or item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * `collection`.
         *
         * If the origin is Signed, then funds of signer are reserved according to the formula:
         * `MetadataDepositBase + DepositPerByte * (key.len + value.len)` taking into
         * account any already reserved funds.
         *
         * - `collection`: The identifier of the collection whose item's metadata to set.
         * - `maybe_item`: The identifier of the item whose metadata to set.
         * - `key`: The key of the attribute.
         * - `value`: The value to which to set the attribute.
         *
         * Emits `AttributeSet`.
         *
         * Weight: `O(1)`
         */
        set_attribute: TxDescriptor<Anonymize<I5tvvgui05tn6e>>;
        /**
         * Clear an attribute for a collection or item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * `collection`.
         *
         * Any deposit is freed for the collection's owner.
         *
         * - `collection`: The identifier of the collection whose item's metadata to clear.
         * - `maybe_item`: The identifier of the item whose metadata to clear.
         * - `key`: The key of the attribute.
         *
         * Emits `AttributeCleared`.
         *
         * Weight: `O(1)`
         */
        clear_attribute: TxDescriptor<Anonymize<Ibal0joadvdc2h>>;
        /**
         * Set the metadata for an item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * `collection`.
         *
         * If the origin is Signed, then funds of signer are reserved according to the formula:
         * `MetadataDepositBase + DepositPerByte * data.len` taking into
         * account any already reserved funds.
         *
         * - `collection`: The identifier of the collection whose item's metadata to set.
         * - `item`: The identifier of the item whose metadata to set.
         * - `data`: The general information of this item. Limited in length by `StringLimit`.
         * - `is_frozen`: Whether the metadata should be frozen against further changes.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_metadata: TxDescriptor<Anonymize<Iceq9fmmp9aeqv>>;
        /**
         * Clear the metadata for an item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * `item`.
         *
         * Any deposit is freed for the collection's owner.
         *
         * - `collection`: The identifier of the collection whose item's metadata to clear.
         * - `item`: The identifier of the item whose metadata to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_metadata: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Set the metadata for a collection.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
         * the `collection`.
         *
         * If the origin is `Signed`, then funds of signer are reserved according to the formula:
         * `MetadataDepositBase + DepositPerByte * data.len` taking into
         * account any already reserved funds.
         *
         * - `collection`: The identifier of the item whose metadata to update.
         * - `data`: The general information of this item. Limited in length by `StringLimit`.
         * - `is_frozen`: Whether the metadata should be frozen against further changes.
         *
         * Emits `CollectionMetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_collection_metadata: TxDescriptor<Anonymize<I9viqhmdtuof5e>>;
        /**
         * Clear the metadata for a collection.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
         * the `collection`.
         *
         * Any deposit is freed for the collection's owner.
         *
         * - `collection`: The identifier of the collection whose metadata to clear.
         *
         * Emits `CollectionMetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_collection_metadata: TxDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * Set (or reset) the acceptance of ownership for a particular account.
         *
         * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
         * provider reference.
         *
         * - `maybe_collection`: The identifier of the collection whose ownership the signer is
         * willing to accept, or if `None`, an indication that the signer is willing to accept no
         * ownership transferal.
         *
         * Emits `OwnershipAcceptanceChanged`.
         */
        set_accept_ownership: TxDescriptor<Anonymize<Ibqooroq6rr5kr>>;
        /**
         * Set the maximum amount of items a collection could have.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
         * the `collection`.
         *
         * Note: This function can only succeed once per collection.
         *
         * - `collection`: The identifier of the collection to change.
         * - `max_supply`: The maximum amount of items a collection could have.
         *
         * Emits `CollectionMaxSupplySet` event when successful.
         */
        set_collection_max_supply: TxDescriptor<Anonymize<I6h88h8vba22v8>>;
        /**
         * Set (or reset) the price for an item.
         *
         * Origin must be Signed and must be the owner of the asset `item`.
         *
         * - `collection`: The collection of the item.
         * - `item`: The item to set the price for.
         * - `price`: The price for the item. Pass `None`, to reset the price.
         * - `buyer`: Restricts the buy operation to a specific account.
         *
         * Emits `ItemPriceSet` on success if the price is not `None`.
         * Emits `ItemPriceRemoved` on success if the price is `None`.
         */
        set_price: TxDescriptor<Anonymize<Ia9cd4jqb5eecb>>;
        /**
         * Allows to buy an item if it's up for sale.
         *
         * Origin must be Signed and must not be the owner of the `item`.
         *
         * - `collection`: The collection of the item.
         * - `item`: The item the sender wants to buy.
         * - `bid_price`: The price the sender is willing to pay.
         *
         * Emits `ItemBought` on success.
         */
        buy_item: TxDescriptor<Anonymize<I19jiel1ftbcce>>;
    };
    Nfts: {
        /**
         * Issue a new collection of non-fungible items from a public origin.
         *
         * This new collection has no items initially and its owner is the origin.
         *
         * The origin must be Signed and the sender must have sufficient funds free.
         *
         * `CollectionDeposit` funds of sender are reserved.
         *
         * Parameters:
         * - `admin`: The admin of this collection. The admin is the initial address of each
         * member of the collection's admin team.
         *
         * Emits `Created` event when successful.
         *
         * Weight: `O(1)`
         */
        create: TxDescriptor<Anonymize<I43aobns89nbkh>>;
        /**
         * Issue a new collection of non-fungible items from a privileged origin.
         *
         * This new collection has no items initially.
         *
         * The origin must conform to `ForceOrigin`.
         *
         * Unlike `create`, no funds are reserved.
         *
         * - `owner`: The owner of this collection of items. The owner has full superuser
         * permissions over this item, but may later change and configure the permissions using
         * `transfer_ownership` and `set_team`.
         *
         * Emits `ForceCreated` event when successful.
         *
         * Weight: `O(1)`
         */
        force_create: TxDescriptor<Anonymize<Iamd7rovec1hfb>>;
        /**
         * Destroy a collection of fungible items.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
         * owner of the `collection`.
         *
         * NOTE: The collection must have 0 items to be destroyed.
         *
         * - `collection`: The identifier of the collection to be destroyed.
         * - `witness`: Information on the items minted in the collection. This must be
         * correct.
         *
         * Emits `Destroyed` event when successful.
         *
         * Weight: `O(m + c + a)` where:
         * - `m = witness.item_metadatas`
         * - `c = witness.item_configs`
         * - `a = witness.attributes`
         */
        destroy: TxDescriptor<Anonymize<I77ie723ncd4co>>;
        /**
         * Mint an item of a particular collection.
         *
         * The origin must be Signed and the sender must comply with the `mint_settings` rules.
         *
         * - `collection`: The collection of the item to be minted.
         * - `item`: An identifier of the new item.
         * - `mint_to`: Account into which the item will be minted.
         * - `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned
         * item_id from that collection needs to be provided within the witness data object. If
         * the mint price is set, then it should be additionally confirmed in the `witness_data`.
         *
         * Note: the deposit will be taken from the `origin` and not the `owner` of the `item`.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         */
        mint: TxDescriptor<Anonymize<Ieebloeahma3ke>>;
        /**
         * Mint an item of a particular collection from a privileged origin.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
         * Issuer of the `collection`.
         *
         * - `collection`: The collection of the item to be minted.
         * - `item`: An identifier of the new item.
         * - `mint_to`: Account into which the item will be minted.
         * - `item_config`: A config of the new item.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         */
        force_mint: TxDescriptor<Anonymize<I4mbtpf4pu3rec>>;
        /**
         * Destroy a single item.
         *
         * The origin must conform to `ForceOrigin` or must be Signed and the signing account must
         * be the owner of the `item`.
         *
         * - `collection`: The collection of the item to be burned.
         * - `item`: The item to be burned.
         *
         * Emits `Burned`.
         *
         * Weight: `O(1)`
         */
        burn: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Move an item from the sender account to another.
         *
         * Origin must be Signed and the signing account must be either:
         * - the Owner of the `item`;
         * - the approved delegate for the `item` (in this case, the approval is reset).
         *
         * Arguments:
         * - `collection`: The collection of the item to be transferred.
         * - `item`: The item to be transferred.
         * - `dest`: The account to receive ownership of the item.
         *
         * Emits `Transferred`.
         *
         * Weight: `O(1)`
         */
        transfer: TxDescriptor<Anonymize<Ibgvkh96s68a66>>;
        /**
         * Re-evaluate the deposits on some items.
         *
         * Origin must be Signed and the sender should be the Owner of the `collection`.
         *
         * - `collection`: The collection of the items to be reevaluated.
         * - `items`: The items of the collection whose deposits will be reevaluated.
         *
         * NOTE: This exists as a best-effort function. Any items which are unknown or
         * in the case that the owner account does not have reservable funds to pay for a
         * deposit increase are ignored. Generally the owner isn't going to call this on items
         * whose existing deposit is less than the refreshed deposit as it would only cost them,
         * so it's of little consequence.
         *
         * It will still return an error in the case that the collection is unknown or the signer
         * is not permitted to call it.
         *
         * Weight: `O(items.len())`
         */
        redeposit: TxDescriptor<Anonymize<If9vko7pv0231m>>;
        /**
         * Disallow further unprivileged transfer of an item.
         *
         * Origin must be Signed and the sender should be the Freezer of the `collection`.
         *
         * - `collection`: The collection of the item to be changed.
         * - `item`: The item to become non-transferable.
         *
         * Emits `ItemTransferLocked`.
         *
         * Weight: `O(1)`
         */
        lock_item_transfer: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Re-allow unprivileged transfer of an item.
         *
         * Origin must be Signed and the sender should be the Freezer of the `collection`.
         *
         * - `collection`: The collection of the item to be changed.
         * - `item`: The item to become transferable.
         *
         * Emits `ItemTransferUnlocked`.
         *
         * Weight: `O(1)`
         */
        unlock_item_transfer: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Disallows specified settings for the whole collection.
         *
         * Origin must be Signed and the sender should be the Owner of the `collection`.
         *
         * - `collection`: The collection to be locked.
         * - `lock_settings`: The settings to be locked.
         *
         * Note: it's possible to only lock(set) the setting, but not to unset it.
         *
         * Emits `CollectionLocked`.
         *
         * Weight: `O(1)`
         */
        lock_collection: TxDescriptor<Anonymize<I1ahf3pvgsgbu>>;
        /**
         * Change the Owner of a collection.
         *
         * Origin must be Signed and the sender should be the Owner of the `collection`.
         *
         * - `collection`: The collection whose owner should be changed.
         * - `owner`: The new Owner of this collection. They must have called
         * `set_accept_ownership` with `collection` in order for this operation to succeed.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        transfer_ownership: TxDescriptor<Anonymize<I736lv5q9m5bot>>;
        /**
         * Change the Issuer, Admin and Freezer of a collection.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * `collection`.
         *
         * Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
         * after to `Some(account)`.
         *
         * - `collection`: The collection whose team should be changed.
         * - `issuer`: The new Issuer of this collection.
         * - `admin`: The new Admin of this collection.
         * - `freezer`: The new Freezer of this collection.
         *
         * Emits `TeamChanged`.
         *
         * Weight: `O(1)`
         */
        set_team: TxDescriptor<Anonymize<I9uapdn16emsti>>;
        /**
         * Change the Owner of a collection.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `collection`: The identifier of the collection.
         * - `owner`: The new Owner of this collection.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        force_collection_owner: TxDescriptor<Anonymize<Ie5i0q2glmr0md>>;
        /**
         * Change the config of a collection.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `collection`: The identifier of the collection.
         * - `config`: The new config of this collection.
         *
         * Emits `CollectionConfigChanged`.
         *
         * Weight: `O(1)`
         */
        force_collection_config: TxDescriptor<Anonymize<I97qcg6i3l8gee>>;
        /**
         * Approve an item to be transferred by a delegated third-party account.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * `item`.
         *
         * - `collection`: The collection of the item to be approved for delegated transfer.
         * - `item`: The item to be approved for delegated transfer.
         * - `delegate`: The account to delegate permission to transfer the item.
         * - `maybe_deadline`: Optional deadline for the approval. Specified by providing the
         * number of blocks after which the approval will expire
         *
         * Emits `TransferApproved` on success.
         *
         * Weight: `O(1)`
         */
        approve_transfer: TxDescriptor<Anonymize<Ib5udrahak005b>>;
        /**
         * Cancel one of the transfer approvals for a specific item.
         *
         * Origin must be either:
         * - the `Force` origin;
         * - `Signed` with the signer being the Owner of the `item`;
         *
         * Arguments:
         * - `collection`: The collection of the item of whose approval will be cancelled.
         * - `item`: The item of the collection of whose approval will be cancelled.
         * - `delegate`: The account that is going to loose their approval.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        cancel_approval: TxDescriptor<Anonymize<Ib92t90p616grb>>;
        /**
         * Cancel all the approvals of a specific item.
         *
         * Origin must be either:
         * - the `Force` origin;
         * - `Signed` with the signer being the Owner of the `item`;
         *
         * Arguments:
         * - `collection`: The collection of the item of whose approvals will be cleared.
         * - `item`: The item of the collection of whose approvals will be cleared.
         *
         * Emits `AllApprovalsCancelled` on success.
         *
         * Weight: `O(1)`
         */
        clear_all_transfer_approvals: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Disallows changing the metadata or attributes of the item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin
         * of the `collection`.
         *
         * - `collection`: The collection if the `item`.
         * - `item`: An item to be locked.
         * - `lock_metadata`: Specifies whether the metadata should be locked.
         * - `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace
         * should be locked.
         *
         * Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.
         * When the metadata or attributes are locked, it won't be possible the unlock them.
         *
         * Emits `ItemPropertiesLocked`.
         *
         * Weight: `O(1)`
         */
        lock_item_properties: TxDescriptor<Anonymize<I1jj31tn29ie3c>>;
        /**
         * Set an attribute for a collection or item.
         *
         * Origin must be Signed and must conform to the namespace ruleset:
         * - `CollectionOwner` namespace could be modified by the `collection` Admin only;
         * - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
         * should be set in that case;
         * - `Account(AccountId)` namespace could be modified only when the `origin` was given a
         * permission to do so;
         *
         * The funds of `origin` are reserved according to the formula:
         * `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
         * account any already reserved funds.
         *
         * - `collection`: The identifier of the collection whose item's metadata to set.
         * - `maybe_item`: The identifier of the item whose metadata to set.
         * - `namespace`: Attribute's namespace.
         * - `key`: The key of the attribute.
         * - `value`: The value to which to set the attribute.
         *
         * Emits `AttributeSet`.
         *
         * Weight: `O(1)`
         */
        set_attribute: TxDescriptor<Anonymize<I5llu6o6a0go5i>>;
        /**
         * Force-set an attribute for a collection or item.
         *
         * Origin must be `ForceOrigin`.
         *
         * If the attribute already exists and it was set by another account, the deposit
         * will be returned to the previous owner.
         *
         * - `set_as`: An optional owner of the attribute.
         * - `collection`: The identifier of the collection whose item's metadata to set.
         * - `maybe_item`: The identifier of the item whose metadata to set.
         * - `namespace`: Attribute's namespace.
         * - `key`: The key of the attribute.
         * - `value`: The value to which to set the attribute.
         *
         * Emits `AttributeSet`.
         *
         * Weight: `O(1)`
         */
        force_set_attribute: TxDescriptor<Anonymize<Ic8b8561e6t9ie>>;
        /**
         * Clear an attribute for a collection or item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
         * attribute.
         *
         * Any deposit is freed for the collection's owner.
         *
         * - `collection`: The identifier of the collection whose item's metadata to clear.
         * - `maybe_item`: The identifier of the item whose metadata to clear.
         * - `namespace`: Attribute's namespace.
         * - `key`: The key of the attribute.
         *
         * Emits `AttributeCleared`.
         *
         * Weight: `O(1)`
         */
        clear_attribute: TxDescriptor<Anonymize<I93r2effh7od84>>;
        /**
         * Approve item's attributes to be changed by a delegated third-party account.
         *
         * Origin must be Signed and must be an owner of the `item`.
         *
         * - `collection`: A collection of the item.
         * - `item`: The item that holds attributes.
         * - `delegate`: The account to delegate permission to change attributes of the item.
         *
         * Emits `ItemAttributesApprovalAdded` on success.
         */
        approve_item_attributes: TxDescriptor<Anonymize<Ib92t90p616grb>>;
        /**
         * Cancel the previously provided approval to change item's attributes.
         * All the previously set attributes by the `delegate` will be removed.
         *
         * Origin must be Signed and must be an owner of the `item`.
         *
         * - `collection`: Collection that the item is contained within.
         * - `item`: The item that holds attributes.
         * - `delegate`: The previously approved account to remove.
         *
         * Emits `ItemAttributesApprovalRemoved` on success.
         */
        cancel_item_attributes_approval: TxDescriptor<Anonymize<I6afd7fllr8otc>>;
        /**
         * Set the metadata for an item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
         * `collection`.
         *
         * If the origin is Signed, then funds of signer are reserved according to the formula:
         * `MetadataDepositBase + DepositPerByte * data.len` taking into
         * account any already reserved funds.
         *
         * - `collection`: The identifier of the collection whose item's metadata to set.
         * - `item`: The identifier of the item whose metadata to set.
         * - `data`: The general information of this item. Limited in length by `StringLimit`.
         *
         * Emits `ItemMetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_metadata: TxDescriptor<Anonymize<Icrkms46uh8tpb>>;
        /**
         * Clear the metadata for an item.
         *
         * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
         * `collection`.
         *
         * Any deposit is freed for the collection's owner.
         *
         * - `collection`: The identifier of the collection whose item's metadata to clear.
         * - `item`: The identifier of the item whose metadata to clear.
         *
         * Emits `ItemMetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_metadata: TxDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Set the metadata for a collection.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
         * the `collection`.
         *
         * If the origin is `Signed`, then funds of signer are reserved according to the formula:
         * `MetadataDepositBase + DepositPerByte * data.len` taking into
         * account any already reserved funds.
         *
         * - `collection`: The identifier of the item whose metadata to update.
         * - `data`: The general information of this item. Limited in length by `StringLimit`.
         *
         * Emits `CollectionMetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_collection_metadata: TxDescriptor<Anonymize<I78u60nqh0etah>>;
        /**
         * Clear the metadata for a collection.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
         * the `collection`.
         *
         * Any deposit is freed for the collection's owner.
         *
         * - `collection`: The identifier of the collection whose metadata to clear.
         *
         * Emits `CollectionMetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_collection_metadata: TxDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * Set (or reset) the acceptance of ownership for a particular account.
         *
         * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
         * provider reference.
         *
         * - `maybe_collection`: The identifier of the collection whose ownership the signer is
         * willing to accept, or if `None`, an indication that the signer is willing to accept no
         * ownership transferal.
         *
         * Emits `OwnershipAcceptanceChanged`.
         */
        set_accept_ownership: TxDescriptor<Anonymize<Ibqooroq6rr5kr>>;
        /**
         * Set the maximum number of items a collection could have.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
         * the `collection`.
         *
         * - `collection`: The identifier of the collection to change.
         * - `max_supply`: The maximum number of items a collection could have.
         *
         * Emits `CollectionMaxSupplySet` event when successful.
         */
        set_collection_max_supply: TxDescriptor<Anonymize<I6h88h8vba22v8>>;
        /**
         * Update mint settings.
         *
         * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
         * of the `collection`.
         *
         * - `collection`: The identifier of the collection to change.
         * - `mint_settings`: The new mint settings.
         *
         * Emits `CollectionMintSettingsUpdated` event when successful.
         */
        update_mint_settings: TxDescriptor<Anonymize<I1lso3vlgherue>>;
        /**
         * Set (or reset) the price for an item.
         *
         * Origin must be Signed and must be the owner of the `item`.
         *
         * - `collection`: The collection of the item.
         * - `item`: The item to set the price for.
         * - `price`: The price for the item. Pass `None`, to reset the price.
         * - `buyer`: Restricts the buy operation to a specific account.
         *
         * Emits `ItemPriceSet` on success if the price is not `None`.
         * Emits `ItemPriceRemoved` on success if the price is `None`.
         */
        set_price: TxDescriptor<Anonymize<Ia9cd4jqb5eecb>>;
        /**
         * Allows to buy an item if it's up for sale.
         *
         * Origin must be Signed and must not be the owner of the `item`.
         *
         * - `collection`: The collection of the item.
         * - `item`: The item the sender wants to buy.
         * - `bid_price`: The price the sender is willing to pay.
         *
         * Emits `ItemBought` on success.
         */
        buy_item: TxDescriptor<Anonymize<I19jiel1ftbcce>>;
        /**
         * Allows to pay the tips.
         *
         * Origin must be Signed.
         *
         * - `tips`: Tips array.
         *
         * Emits `TipSent` on every tip transfer.
         */
        pay_tips: TxDescriptor<Anonymize<I26c8p47106toa>>;
        /**
         * Register a new atomic swap, declaring an intention to send an `item` in exchange for
         * `desired_item` from origin to target on the current blockchain.
         * The target can execute the swap during the specified `duration` of blocks (if set).
         * Additionally, the price could be set for the desired `item`.
         *
         * Origin must be Signed and must be an owner of the `item`.
         *
         * - `collection`: The collection of the item.
         * - `item`: The item an owner wants to give.
         * - `desired_collection`: The collection of the desired item.
         * - `desired_item`: The desired item an owner wants to receive.
         * - `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.
         * - `duration`: A deadline for the swap. Specified by providing the number of blocks
         * after which the swap will expire.
         *
         * Emits `SwapCreated` on success.
         */
        create_swap: TxDescriptor<Anonymize<Iq82b3qvf20ne>>;
        /**
         * Cancel an atomic swap.
         *
         * Origin must be Signed.
         * Origin must be an owner of the `item` if the deadline hasn't expired.
         *
         * - `collection`: The collection of the item.
         * - `item`: The item an owner wants to give.
         *
         * Emits `SwapCancelled` on success.
         */
        cancel_swap: TxDescriptor<Anonymize<Ic3j8ku6mbsms4>>;
        /**
         * Claim an atomic swap.
         * This method executes a pending swap, that was created by a counterpart before.
         *
         * Origin must be Signed and must be an owner of the `item`.
         *
         * - `send_collection`: The collection of the item to be sent.
         * - `send_item`: The item to be sent.
         * - `receive_collection`: The collection of the item to be received.
         * - `receive_item`: The item to be received.
         * - `witness_price`: A price that was previously agreed on.
         *
         * Emits `SwapClaimed` on success.
         */
        claim_swap: TxDescriptor<Anonymize<I3nvoqsi8f05ph>>;
        /**
         * Mint an item by providing the pre-signed approval.
         *
         * Origin must be Signed.
         *
         * - `mint_data`: The pre-signed approval that consists of the information about the item,
         * its metadata, attributes, who can mint it (`None` for anyone) and until what block
         * number.
         * - `signature`: The signature of the `data` object.
         * - `signer`: The `data` object's signer. Should be an Issuer of the collection.
         *
         * Emits `Issued` on success.
         * Emits `AttributeSet` if the attributes were provided.
         * Emits `ItemMetadataSet` if the metadata was not empty.
         */
        mint_pre_signed: TxDescriptor<Anonymize<I3eoft5md071do>>;
        /**
         * Set attributes for an item by providing the pre-signed approval.
         *
         * Origin must be Signed and must be an owner of the `data.item`.
         *
         * - `data`: The pre-signed approval that consists of the information about the item,
         * attributes to update and until what block number.
         * - `signature`: The signature of the `data` object.
         * - `signer`: The `data` object's signer. Should be an Admin of the collection for the
         * `CollectionOwner` namespace.
         *
         * Emits `AttributeSet` for each provided attribute.
         * Emits `ItemAttributesApprovalAdded` if the approval wasn't set before.
         * Emits `PreSignedAttributesSet` on success.
         */
        set_attributes_pre_signed: TxDescriptor<Anonymize<I923eug653ra0o>>;
    };
    ForeignAssets: {
        /**
         * Issue a new class of fungible assets from a public origin.
         *
         * This new asset class has no assets initially and its owner is the origin.
         *
         * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
         *
         * Funds of sender are reserved by `AssetDeposit`.
         *
         * Parameters:
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `admin`: The admin of this class of assets. The admin is the initial address of each
         * member of the asset class's admin team.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `Created` event when successful.
         *
         * Weight: `O(1)`
         */
        create: TxDescriptor<Anonymize<I7t2thek61ghou>>;
        /**
         * Issue a new class of fungible assets from a privileged origin.
         *
         * This new asset class has no assets initially.
         *
         * The origin must conform to `ForceOrigin`.
         *
         * Unlike `create`, no funds are reserved.
         *
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `owner`: The owner of this class of assets. The owner has full superuser permissions
         * over this asset, but may later change and configure the permissions using
         * `transfer_ownership` and `set_team`.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `ForceCreated` event when successful.
         *
         * Weight: `O(1)`
         */
        force_create: TxDescriptor<Anonymize<I61tdrsafr1vf3>>;
        /**
         * Start the process of destroying a fungible asset class.
         *
         * `start_destroy` is the first in a series of extrinsics that should be called, to allow
         * destruction of an asset class.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * an account contains holds or freezes in place.
         */
        start_destroy: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Destroy all accounts associated with a given asset.
         *
         * `destroy_accounts` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedAccounts` event.
         */
        destroy_accounts: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
         *
         * `destroy_approvals` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedApprovals` event.
         */
        destroy_approvals: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Complete destroying asset and unreserve currency.
         *
         * `finish_destroy` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
         * hand.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each successful call emits the `Event::Destroyed` event.
         */
        finish_destroy: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Mint assets of a particular class.
         *
         * The origin must be Signed and the sender must be the Issuer of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount minted.
         * - `beneficiary`: The account to be credited with the minted assets.
         * - `amount`: The amount of the asset to be minted.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
         */
        mint: TxDescriptor<Anonymize<Icfoe9q8d4vs8f>>;
        /**
         * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
         *
         * Origin must be Signed and the sender should be the Manager of the asset `id`.
         *
         * Bails with `NoAccount` if the `who` is already dead.
         *
         * - `id`: The identifier of the asset to have some amount burned.
         * - `who`: The account to be debited from.
         * - `amount`: The maximum amount by which `who`'s balance should be reduced.
         *
         * Emits `Burned` with the actual amount burned. If this takes the balance to below the
         * minimum for the asset, then the amount burned is increased to take it to zero.
         *
         * Weight: `O(1)`
         * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
         */
        burn: TxDescriptor<Anonymize<Ibrfmvjrg4trnb>>;
        /**
         * Move some assets from the sender account to another.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer: TxDescriptor<Anonymize<Iedih7t34maii9>>;
        /**
         * Move some assets from the sender account to another, keeping the sender account alive.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer_keep_alive: TxDescriptor<Anonymize<Iedih7t34maii9>>;
        /**
         * Move some assets from one account to another.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `source`: The account to be debited.
         * - `dest`: The account to be credited.
         * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
         * `dest`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the `source` balance above zero but
         * below the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
         * `dest`.
         */
        force_transfer: TxDescriptor<Anonymize<I4e902qbfel1f1>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
         * must already exist as an entry in `Account`s of the asset. If you want to freeze an
         * account that does not have an entry, use `touch_other` first.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze: TxDescriptor<Anonymize<Ie4met0joi8sv0>>;
        /**
         * Allow unprivileged transfers to and from an account again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be unfrozen.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw: TxDescriptor<Anonymize<Ie4met0joi8sv0>>;
        /**
         * Disallow further unprivileged transfers for the asset class.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze_asset: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Allow unprivileged transfers for the asset again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be thawed.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw_asset: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Change the Owner of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        transfer_ownership: TxDescriptor<Anonymize<I1t8vq6a06ohhu>>;
        /**
         * Change the Issuer, Admin and Freezer of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         *
         * Emits `TeamChanged`.
         *
         * Weight: `O(1)`
         */
        set_team: TxDescriptor<Anonymize<Icvt3pdunbinm7>>;
        /**
         * Set the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Funds of sender are reserved according to the formula:
         * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
         * account any already reserved funds.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_metadata: TxDescriptor<Anonymize<I9ui3n41balr2q>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Any deposit is freed for the asset owner.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_metadata: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Force the metadata for an asset to some value.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is left alone.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
         */
        force_set_metadata: TxDescriptor<Anonymize<I89sl7btgl24g2>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is returned.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        force_clear_metadata: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Alter the attributes of a given asset.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
         * value to account for the state bloat associated with its balance storage. If set to
         * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
         * an ED in the Balances pallet or whatever else is used to control user-account state
         * growth).
         * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
         * instructions.
         *
         * Emits `AssetStatusChanged` with the identity of the asset.
         *
         * Weight: `O(1)`
         */
        force_asset_status: TxDescriptor<Anonymize<I3u6g26k9kn96u>>;
        /**
         * Approve an amount of asset for transfer by a delegated third-party account.
         *
         * Origin must be Signed.
         *
         * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
         * for the purpose of holding the approval. If some non-zero amount of assets is already
         * approved from signing account to `delegate`, then it is topped up or unreserved to
         * meet the right value.
         *
         * NOTE: The signing account does not need to own `amount` of assets at the point of
         * making this call.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account to delegate permission to transfer asset.
         * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
         * already an approval in place, then this acts additively.
         *
         * Emits `ApprovedTransfer` on success.
         *
         * Weight: `O(1)`
         */
        approve_transfer: TxDescriptor<Anonymize<If1invp94rsjms>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be Signed and there must be an approval in place between signer and
         * `delegate`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        cancel_approval: TxDescriptor<Anonymize<Ie5nc19gtiv5sv>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
         * account of the asset `id`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        force_cancel_approval: TxDescriptor<Anonymize<Iald3dgvt1hjkb>>;
        /**
         * Transfer some asset balance from a previously delegated account to some third-party
         * account.
         *
         * Origin must be Signed and there must be an approval in place by the `owner` to the
         * signer.
         *
         * If the entire amount approved for transfer is transferred, then any deposit previously
         * reserved by `approve_transfer` is unreserved.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The account which previously approved for a transfer of at least `amount` and
         * from which the asset balance will be withdrawn.
         * - `destination`: The account to which the asset balance of `amount` will be transferred.
         * - `amount`: The amount of assets to transfer.
         *
         * Emits `TransferredApproved` on success.
         *
         * Weight: `O(1)`
         */
        transfer_approved: TxDescriptor<Anonymize<Iurrhahet4gno>>;
        /**
         * Create an asset account for non-provider assets.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
         * to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch: TxDescriptor<Anonymize<Ibsk5g3rhm45pu>>;
        /**
         * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
         * account.
         *
         * The origin must be Signed.
         *
         * - `id`: The identifier of the asset for which the caller would like the deposit
         * refunded.
         * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * the asset account contains holds or freezes in place.
         *
         * Emits `Refunded` event when successful.
         */
        refund: TxDescriptor<Anonymize<I5tamv2nk8bj8o>>;
        /**
         * Sets the minimum balance of an asset.
         *
         * Only works if there aren't any accounts that are holding the asset or if
         * the new value of `min_balance` is less than the old one.
         *
         * Origin must be Signed and the sender has to be the Owner of the
         * asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `min_balance`: The new value of `min_balance`.
         *
         * Emits `AssetMinBalanceChanged` event when successful.
         */
        set_min_balance: TxDescriptor<Anonymize<I8apq8e7c7qcpp>>;
        /**
         * Create an asset account for `who`.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
         * must have sufficient funds for a deposit to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         * - `who`: The account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch_other: TxDescriptor<Anonymize<Ie4met0joi8sv0>>;
        /**
         * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
         *
         * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
         * order to burn a non-zero balance of the asset, the caller must be the account and should
         * use `refund`.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `who`: The account to refund.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * the asset account contains holds or freezes in place.
         *
         * Emits `Refunded` event when successful.
         */
        refund_other: TxDescriptor<Anonymize<Ie4met0joi8sv0>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the account's asset.
         * - `who`: The account to be unblocked.
         *
         * Emits `Blocked`.
         *
         * Weight: `O(1)`
         */
        block: TxDescriptor<Anonymize<Ie4met0joi8sv0>>;
        /**
         * Transfer the entire transferable balance from the caller asset account.
         *
         * NOTE: This function only attempts to transfer _transferable_ balances. This means that
         * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
         * transferred by this function. To ensure that this function results in a killed account,
         * you might need to prepare the account by removing any reference counters, storage
         * deposits, etc...
         *
         * The dispatch origin of this call must be Signed.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `dest`: The recipient of the transfer.
         * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
         * of the funds the asset account has, causing the sender asset account to be killed
         * (false), or transfer everything except at least the minimum balance, which will
         * guarantee to keep the sender asset account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<Id1e31ij0c35fv>>;
    };
    PoolAssets: {
        /**
         * Issue a new class of fungible assets from a public origin.
         *
         * This new asset class has no assets initially and its owner is the origin.
         *
         * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
         *
         * Funds of sender are reserved by `AssetDeposit`.
         *
         * Parameters:
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `admin`: The admin of this class of assets. The admin is the initial address of each
         * member of the asset class's admin team.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `Created` event when successful.
         *
         * Weight: `O(1)`
         */
        create: TxDescriptor<Anonymize<Ic357tcepuvo5c>>;
        /**
         * Issue a new class of fungible assets from a privileged origin.
         *
         * This new asset class has no assets initially.
         *
         * The origin must conform to `ForceOrigin`.
         *
         * Unlike `create`, no funds are reserved.
         *
         * - `id`: The identifier of the new asset. This must not be currently in use to identify
         * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
         * - `owner`: The owner of this class of assets. The owner has full superuser permissions
         * over this asset, but may later change and configure the permissions using
         * `transfer_ownership` and `set_team`.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         *
         * Emits `ForceCreated` event when successful.
         *
         * Weight: `O(1)`
         */
        force_create: TxDescriptor<Anonymize<I2rnoam876ruhj>>;
        /**
         * Start the process of destroying a fungible asset class.
         *
         * `start_destroy` is the first in a series of extrinsics that should be called, to allow
         * destruction of an asset class.
         *
         * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * an account contains holds or freezes in place.
         */
        start_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Destroy all accounts associated with a given asset.
         *
         * `destroy_accounts` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedAccounts` event.
         */
        destroy_accounts: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
         *
         * `destroy_approvals` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state.
         *
         * Due to weight restrictions, this function may need to be called multiple times to fully
         * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each call emits the `Event::DestroyedApprovals` event.
         */
        destroy_approvals: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Complete destroying asset and unreserve currency.
         *
         * `finish_destroy` should only be called after `start_destroy` has been called, and the
         * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
         * hand.
         *
         * - `id`: The identifier of the asset to be destroyed. This must identify an existing
         * asset.
         *
         * Each successful call emits the `Event::Destroyed` event.
         */
        finish_destroy: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Mint assets of a particular class.
         *
         * The origin must be Signed and the sender must be the Issuer of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount minted.
         * - `beneficiary`: The account to be credited with the minted assets.
         * - `amount`: The amount of the asset to be minted.
         *
         * Emits `Issued` event when successful.
         *
         * Weight: `O(1)`
         * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
         */
        mint: TxDescriptor<Anonymize<Ib3qnc19gu633c>>;
        /**
         * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
         *
         * Origin must be Signed and the sender should be the Manager of the asset `id`.
         *
         * Bails with `NoAccount` if the `who` is already dead.
         *
         * - `id`: The identifier of the asset to have some amount burned.
         * - `who`: The account to be debited from.
         * - `amount`: The maximum amount by which `who`'s balance should be reduced.
         *
         * Emits `Burned` with the actual amount burned. If this takes the balance to below the
         * minimum for the asset, then the amount burned is increased to take it to zero.
         *
         * Weight: `O(1)`
         * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
         */
        burn: TxDescriptor<Anonymize<Ifira6u9hi7cu1>>;
        /**
         * Move some assets from the sender account to another.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer: TxDescriptor<Anonymize<I72tqocvdoqfff>>;
        /**
         * Move some assets from the sender account to another, keeping the sender account alive.
         *
         * Origin must be Signed.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `target`: The account to be credited.
         * - `amount`: The amount by which the sender's balance of assets should be reduced and
         * `target`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the sender balance above zero but below
         * the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
         * `target`.
         */
        transfer_keep_alive: TxDescriptor<Anonymize<I72tqocvdoqfff>>;
        /**
         * Move some assets from one account to another.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to have some amount transferred.
         * - `source`: The account to be debited.
         * - `dest`: The account to be credited.
         * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
         * `dest`'s balance increased. The amount actually transferred may be slightly greater in
         * the case that the transfer would otherwise take the `source` balance above zero but
         * below the minimum balance. Must be greater than zero.
         *
         * Emits `Transferred` with the actual amount transferred. If this takes the source balance
         * to below the minimum for the asset, then the amount transferred is increased to take it
         * to zero.
         *
         * Weight: `O(1)`
         * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
         * `dest`.
         */
        force_transfer: TxDescriptor<Anonymize<I2i27f3sfmvc05>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
         * must already exist as an entry in `Account`s of the asset. If you want to freeze an
         * account that does not have an entry, use `touch_other` first.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Allow unprivileged transfers to and from an account again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `who`: The account to be unfrozen.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Disallow further unprivileged transfers for the asset class.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         *
         * Emits `Frozen`.
         *
         * Weight: `O(1)`
         */
        freeze_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Allow unprivileged transfers for the asset again.
         *
         * Origin must be Signed and the sender should be the Admin of the asset `id`.
         *
         * - `id`: The identifier of the asset to be thawed.
         *
         * Emits `Thawed`.
         *
         * Weight: `O(1)`
         */
        thaw_asset: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Change the Owner of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         *
         * Emits `OwnerChanged`.
         *
         * Weight: `O(1)`
         */
        transfer_ownership: TxDescriptor<Anonymize<I3abtumcmempjs>>;
        /**
         * Change the Issuer, Admin and Freezer of an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * - `id`: The identifier of the asset to be frozen.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         *
         * Emits `TeamChanged`.
         *
         * Weight: `O(1)`
         */
        set_team: TxDescriptor<Anonymize<Id81m8flopt8ha>>;
        /**
         * Set the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Funds of sender are reserved according to the formula:
         * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
         * account any already reserved funds.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(1)`
         */
        set_metadata: TxDescriptor<Anonymize<I8hff7chabggkd>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be Signed and the sender should be the Owner of the asset `id`.
         *
         * Any deposit is freed for the asset owner.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Force the metadata for an asset to some value.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is left alone.
         *
         * - `id`: The identifier of the asset to update.
         * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
         * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
         * - `decimals`: The number of decimals this asset uses to represent one unit.
         *
         * Emits `MetadataSet`.
         *
         * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
         */
        force_set_metadata: TxDescriptor<Anonymize<I49i39mtj1ivbs>>;
        /**
         * Clear the metadata for an asset.
         *
         * Origin must be ForceOrigin.
         *
         * Any deposit is returned.
         *
         * - `id`: The identifier of the asset to clear.
         *
         * Emits `MetadataCleared`.
         *
         * Weight: `O(1)`
         */
        force_clear_metadata: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Alter the attributes of a given asset.
         *
         * Origin must be `ForceOrigin`.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The new Owner of this asset.
         * - `issuer`: The new Issuer of this asset.
         * - `admin`: The new Admin of this asset.
         * - `freezer`: The new Freezer of this asset.
         * - `min_balance`: The minimum balance of this new asset that any single account must
         * have. If an account's balance is reduced below this, then it collapses to zero.
         * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
         * value to account for the state bloat associated with its balance storage. If set to
         * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
         * an ED in the Balances pallet or whatever else is used to control user-account state
         * growth).
         * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
         * instructions.
         *
         * Emits `AssetStatusChanged` with the identity of the asset.
         *
         * Weight: `O(1)`
         */
        force_asset_status: TxDescriptor<Anonymize<Ifkr2kcak2vto1>>;
        /**
         * Approve an amount of asset for transfer by a delegated third-party account.
         *
         * Origin must be Signed.
         *
         * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
         * for the purpose of holding the approval. If some non-zero amount of assets is already
         * approved from signing account to `delegate`, then it is topped up or unreserved to
         * meet the right value.
         *
         * NOTE: The signing account does not need to own `amount` of assets at the point of
         * making this call.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account to delegate permission to transfer asset.
         * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
         * already an approval in place, then this acts additively.
         *
         * Emits `ApprovedTransfer` on success.
         *
         * Weight: `O(1)`
         */
        approve_transfer: TxDescriptor<Anonymize<I1ju6r8q0cs9jt>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be Signed and there must be an approval in place between signer and
         * `delegate`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        cancel_approval: TxDescriptor<Anonymize<I4kpeq6j7cd5bu>>;
        /**
         * Cancel all of some asset approved for delegated transfer by a third-party account.
         *
         * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
         * account of the asset `id`.
         *
         * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
         *
         * - `id`: The identifier of the asset.
         * - `delegate`: The account delegated permission to transfer asset.
         *
         * Emits `ApprovalCancelled` on success.
         *
         * Weight: `O(1)`
         */
        force_cancel_approval: TxDescriptor<Anonymize<I5na1ka76k6811>>;
        /**
         * Transfer some asset balance from a previously delegated account to some third-party
         * account.
         *
         * Origin must be Signed and there must be an approval in place by the `owner` to the
         * signer.
         *
         * If the entire amount approved for transfer is transferred, then any deposit previously
         * reserved by `approve_transfer` is unreserved.
         *
         * - `id`: The identifier of the asset.
         * - `owner`: The account which previously approved for a transfer of at least `amount` and
         * from which the asset balance will be withdrawn.
         * - `destination`: The account to which the asset balance of `amount` will be transferred.
         * - `amount`: The amount of assets to transfer.
         *
         * Emits `TransferredApproved` on success.
         *
         * Weight: `O(1)`
         */
        transfer_approved: TxDescriptor<Anonymize<I59mhdb9omdqfa>>;
        /**
         * Create an asset account for non-provider assets.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
         * to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch: TxDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
         * account.
         *
         * The origin must be Signed.
         *
         * - `id`: The identifier of the asset for which the caller would like the deposit
         * refunded.
         * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * the asset account contains holds or freezes in place.
         *
         * Emits `Refunded` event when successful.
         */
        refund: TxDescriptor<Anonymize<I9vl5kpk0fpakt>>;
        /**
         * Sets the minimum balance of an asset.
         *
         * Only works if there aren't any accounts that are holding the asset or if
         * the new value of `min_balance` is less than the old one.
         *
         * Origin must be Signed and the sender has to be the Owner of the
         * asset `id`.
         *
         * - `id`: The identifier of the asset.
         * - `min_balance`: The new value of `min_balance`.
         *
         * Emits `AssetMinBalanceChanged` event when successful.
         */
        set_min_balance: TxDescriptor<Anonymize<I717jt61hu19b4>>;
        /**
         * Create an asset account for `who`.
         *
         * A deposit will be taken from the signer account.
         *
         * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
         * must have sufficient funds for a deposit to be taken.
         * - `id`: The identifier of the asset for the account to be created.
         * - `who`: The account to be created.
         *
         * Emits `Touched` event when successful.
         */
        touch_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
         *
         * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
         * order to burn a non-zero balance of the asset, the caller must be the account and should
         * use `refund`.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `who`: The account to refund.
         *
         * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
         * the asset account contains holds or freezes in place.
         *
         * Emits `Refunded` event when successful.
         */
        refund_other: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
         *
         * Origin must be Signed and the sender should be the Freezer of the asset `id`.
         *
         * - `id`: The identifier of the account's asset.
         * - `who`: The account to be unblocked.
         *
         * Emits `Blocked`.
         *
         * Weight: `O(1)`
         */
        block: TxDescriptor<Anonymize<I1nlrtd1epki2d>>;
        /**
         * Transfer the entire transferable balance from the caller asset account.
         *
         * NOTE: This function only attempts to transfer _transferable_ balances. This means that
         * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
         * transferred by this function. To ensure that this function results in a killed account,
         * you might need to prepare the account by removing any reference counters, storage
         * deposits, etc...
         *
         * The dispatch origin of this call must be Signed.
         *
         * - `id`: The identifier of the asset for the account holding a deposit.
         * - `dest`: The recipient of the transfer.
         * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
         * of the funds the asset account has, causing the sender asset account to be killed
         * (false), or transfer everything except at least the minimum balance, which will
         * guarantee to keep the sender asset account alive (true).
         */
        transfer_all: TxDescriptor<Anonymize<I7f7v8192r1lmq>>;
    };
    AssetConversion: {
        /**
         * Creates an empty liquidity pool and an associated new `lp_token` asset
         * (the id of which is returned in the `Event::PoolCreated` event).
         *
         * Once a pool is created, someone may [`Pallet::add_liquidity`] to it.
         */
        create_pool: TxDescriptor<Anonymize<I3ip09dj7i1e8n>>;
        /**
         * Provide liquidity into the pool of `asset1` and `asset2`.
         * NOTE: an optimal amount of asset1 and asset2 will be calculated and
         * might be different than the provided `amount1_desired`/`amount2_desired`
         * thus you should provide the min amount you're happy to provide.
         * Params `amount1_min`/`amount2_min` represent that.
         * `mint_to` will be sent the liquidity tokens that represent this share of the pool.
         *
         * NOTE: when encountering an incorrect exchange rate and non-withdrawable pool liquidity,
         * batch an atomic call with [`Pallet::add_liquidity`] and
         * [`Pallet::swap_exact_tokens_for_tokens`] or [`Pallet::swap_tokens_for_exact_tokens`]
         * calls to render the liquidity withdrawable and rectify the exchange rate.
         *
         * Once liquidity is added, someone may successfully call
         * [`Pallet::swap_exact_tokens_for_tokens`].
         */
        add_liquidity: TxDescriptor<Anonymize<Ide34bfv94bvut>>;
        /**
         * Allows you to remove liquidity by providing the `lp_token_burn` tokens that will be
         * burned in the process. With the usage of `amount1_min_receive`/`amount2_min_receive`
         * it's possible to control the min amount of returned tokens you're happy with.
         */
        remove_liquidity: TxDescriptor<Anonymize<I6c7mabde89bp>>;
        /**
         * Swap the exact amount of `asset1` into `asset2`.
         * `amount_out_min` param allows you to specify the min amount of the `asset2`
         * you're happy to receive.
         *
         * [`AssetConversionApi::quote_price_exact_tokens_for_tokens`] runtime call can be called
         * for a quote.
         */
        swap_exact_tokens_for_tokens: TxDescriptor<Anonymize<I9sbpodgd8ilku>>;
        /**
         * Swap any amount of `asset1` to get the exact amount of `asset2`.
         * `amount_in_max` param allows to specify the max amount of the `asset1`
         * you're happy to provide.
         *
         * [`AssetConversionApi::quote_price_tokens_for_exact_tokens`] runtime call can be called
         * for a quote.
         */
        swap_tokens_for_exact_tokens: TxDescriptor<Anonymize<Ialnqi1f4kpb>>;
        /**
         * Touch an existing pool to fulfill prerequisites before providing liquidity, such as
         * ensuring that the pool's accounts are in place. It is typically useful when a pool
         * creator removes the pool's accounts and does not provide a liquidity. This action may
         * involve holding assets from the caller as a deposit for creating the pool's accounts.
         *
         * The origin must be Signed.
         *
         * - `asset1`: The asset ID of an existing pool with a pair (asset1, asset2).
         * - `asset2`: The asset ID of an existing pool with a pair (asset1, asset2).
         *
         * Emits `Touched` event when successful.
         */
        touch: TxDescriptor<Anonymize<I3ip09dj7i1e8n>>;
    };
    Treasury: {
        /**
         * Propose and approve a spend of treasury funds.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
         *
         * ### Details
         * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
         * beneficiary.
         *
         * ### Parameters
         * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
         * - `beneficiary`: The destination account for the transfer.
         *
         * ## Events
         *
         * Emits [`Event::SpendApproved`] if successful.
         */
        spend_local: TxDescriptor<Anonymize<Icnrv1mfbd3in1>>;
        /**
         * Force a previously approved proposal to be removed from the approval queue.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         *
         * The original deposit will no longer be returned.
         *
         * ### Parameters
         * - `proposal_id`: The index of a proposal
         *
         * ### Complexity
         * - O(A) where `A` is the number of approvals
         *
         * ### Errors
         * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
         * approval queue, i.e., the proposal has not been approved. This could also mean the
         * proposal does not exist altogether, thus there is no way it would have been approved
         * in the first place.
         */
        remove_approval: TxDescriptor<Anonymize<Icm9m0qeemu66d>>;
        /**
         * Propose and approve a spend of treasury funds.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::SpendOrigin`] with the `Success` value being at least
         * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
         * for assertion using the [`Config::BalanceConverter`].
         *
         * ## Details
         *
         * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
         * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
         * the [`Config::PayoutPeriod`].
         *
         * ### Parameters
         * - `asset_kind`: An indicator of the specific asset class to be spent.
         * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
         * - `beneficiary`: The beneficiary of the spend.
         * - `valid_from`: The block number from which the spend can be claimed. It can refer to
         * the past if the resulting spend has not yet expired according to the
         * [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
         * approval.
         *
         * ## Events
         *
         * Emits [`Event::AssetSpendApproved`] if successful.
         */
        spend: TxDescriptor<Anonymize<I79dicn2l2lfgs>>;
        /**
         * Claim a spend.
         *
         * ## Dispatch Origin
         *
         * Must be signed
         *
         * ## Details
         *
         * Spends must be claimed within some temporal bounds. A spend may be claimed within one
         * [`Config::PayoutPeriod`] from the `valid_from` block.
         * In case of a payout failure, the spend status must be updated with the `check_status`
         * dispatchable before retrying with the current function.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::Paid`] if successful.
         */
        payout: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Check the status of the spend and remove it from the storage if processed.
         *
         * ## Dispatch Origin
         *
         * Must be signed.
         *
         * ## Details
         *
         * The status check is a prerequisite for retrying a failed payout.
         * If a spend has either succeeded or expired, it is removed from the storage by this
         * function. In such instances, transaction fees are refunded.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::PaymentFailed`] if the spend payout has failed.
         * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
         */
        check_status: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Void previously approved spend.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         *
         * A spend void is only possible if the payout has not been attempted yet.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::AssetSpendVoided`] if successful.
         */
        void_spend: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
    };
    ConvictionVoting: {
        /**
         * Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;
         * otherwise it is a vote to keep the status quo.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `poll_index`: The index of the poll to vote for.
         * - `vote`: The vote configuration.
         *
         * Weight: `O(R)` where R is the number of polls the voter has voted on.
         */
        vote: TxDescriptor<Anonymize<Idnsr2pndm36h0>>;
        /**
         * Delegate the voting power (with some given conviction) of the sending account for a
         * particular class of polls.
         *
         * The balance delegated is locked for as long as it's delegated, and thereafter for the
         * time appropriate for the conviction's lock period.
         *
         * The dispatch origin of this call must be _Signed_, and the signing account must either:
         * - be delegating already; or
         * - have no voting activity (if there is, then it will need to be removed through
         * `remove_vote`).
         *
         * - `to`: The account whose voting the `target` account's voting power will follow.
         * - `class`: The class of polls to delegate. To delegate multiple classes, multiple calls
         * to this function are required.
         * - `conviction`: The conviction that will be attached to the delegated votes. When the
         * account is undelegated, the funds will be locked for the corresponding period.
         * - `balance`: The amount of the account's balance to be used in delegating. This must not
         * be more than the account's current balance.
         *
         * Emits `Delegated`.
         *
         * Weight: `O(R)` where R is the number of polls the voter delegating to has
         * voted on. Weight is initially charged as if maximum votes, but is refunded later.
         */
        delegate: TxDescriptor<Anonymize<Ia1pvdcbhuqf8m>>;
        /**
         * Undelegate the voting power of the sending account for a particular class of polls.
         *
         * Tokens may be unlocked following once an amount of time consistent with the lock period
         * of the conviction with which the delegation was issued has passed.
         *
         * The dispatch origin of this call must be _Signed_ and the signing account must be
         * currently delegating.
         *
         * - `class`: The class of polls to remove the delegation from.
         *
         * Emits `Undelegated`.
         *
         * Weight: `O(R)` where R is the number of polls the voter delegating to has
         * voted on. Weight is initially charged as if maximum votes, but is refunded later.
         */
        undelegate: TxDescriptor<Anonymize<I8steo882k7qns>>;
        /**
         * Remove the lock caused by prior voting/delegating which has expired within a particular
         * class.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `class`: The class of polls to unlock.
         * - `target`: The account to remove the lock on.
         *
         * Weight: `O(R)` with R number of vote of target.
         */
        unlock: TxDescriptor<Anonymize<I4pa4q37gj6fua>>;
        /**
         * Remove a vote for a poll.
         *
         * If:
         * - the poll was cancelled, or
         * - the poll is ongoing, or
         * - the poll has ended such that
         * - the vote of the account was in opposition to the result; or
         * - there was no conviction to the account's vote; or
         * - the account made a split vote
         * ...then the vote is removed cleanly and a following call to `unlock` may result in more
         * funds being available.
         *
         * If, however, the poll has ended and:
         * - it finished corresponding to the vote of the account, and
         * - the account made a standard vote with conviction, and
         * - the lock period of the conviction is not over
         * ...then the lock will be aggregated into the overall account's lock, which may involve
         * *overlocking* (where the two locks are combined into a single lock that is the maximum
         * of both the amount locked and the time is it locked for).
         *
         * The dispatch origin of this call must be _Signed_, and the signer must have a vote
         * registered for poll `index`.
         *
         * - `index`: The index of poll of the vote to be removed.
         * - `class`: Optional parameter, if given it indicates the class of the poll. For polls
         * which have finished or are cancelled, this must be `Some`.
         *
         * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
         * Weight is calculated for the maximum number of vote.
         */
        remove_vote: TxDescriptor<Anonymize<I5f178ab6b89t3>>;
        /**
         * Remove a vote for a poll.
         *
         * If the `target` is equal to the signer, then this function is exactly equivalent to
         * `remove_vote`. If not equal to the signer, then the vote must have expired,
         * either because the poll was cancelled, because the voter lost the poll or
         * because the conviction period is over.
         *
         * The dispatch origin of this call must be _Signed_.
         *
         * - `target`: The account of the vote to be removed; this account must have voted for poll
         * `index`.
         * - `index`: The index of poll of the vote to be removed.
         * - `class`: The class of the poll.
         *
         * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
         * Weight is calculated for the maximum number of vote.
         */
        remove_other_vote: TxDescriptor<Anonymize<I4nakhtbsk3c5s>>;
    };
    Referenda: {
        /**
         * Propose a referendum on a privileged action.
         *
         * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
         * available.
         * - `proposal_origin`: The origin from which the proposal should be executed.
         * - `proposal`: The proposal.
         * - `enactment_moment`: The moment that the proposal should be enacted.
         *
         * Emits `Submitted`.
         */
        submit: TxDescriptor<Anonymize<I1olkr8c4fu16n>>;
        /**
         * Post the Decision Deposit for a referendum.
         *
         * - `origin`: must be `Signed` and the account must have funds available for the
         * referendum's track's Decision Deposit.
         * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
         * posted.
         *
         * Emits `DecisionDepositPlaced`.
         */
        place_decision_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Refund the Decision Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
         * refunded.
         *
         * Emits `DecisionDepositRefunded`.
         */
        refund_decision_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Cancel an ongoing referendum.
         *
         * - `origin`: must be the `CancelOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Cancelled`.
         */
        cancel: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Cancel an ongoing referendum and slash the deposits.
         *
         * - `origin`: must be the `KillOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Killed` and `DepositSlashed`.
         */
        kill: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Advance a referendum onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `index`: the referendum to be advanced.
         */
        nudge_referendum: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Advance a track onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `track`: the track to be advanced.
         *
         * Action item for when there is now one fewer referendum in the deciding phase and the
         * `DecidingCount` is not yet updated. This means that we should either:
         * - begin deciding another referendum (and leave `DecidingCount` alone); or
         * - decrement `DecidingCount`.
         */
        one_fewer_deciding: TxDescriptor<Anonymize<Icbio0e1f0034b>>;
        /**
         * Refund the Submission Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
         * refunded.
         *
         * Emits `SubmissionDepositRefunded`.
         */
        refund_submission_deposit: TxDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * Set or clear metadata of a referendum.
         *
         * Parameters:
         * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
         * metadata of a finished referendum.
         * - `index`:  The index of a referendum to set or clear metadata for.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        set_metadata: TxDescriptor<Anonymize<I8c0vkqjjipnuj>>;
    };
    Whitelist: {
        /**
        
         */
        whitelist_call: TxDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        remove_whitelisted_call: TxDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        dispatch_whitelisted_call: TxDescriptor<Anonymize<Ibf6ucefn8fh49>>;
        /**
        
         */
        dispatch_whitelisted_call_with_preimage: TxDescriptor<Anonymize<Ia3okqcb5ev76q>>;
    };
    Bounties: {
        /**
         * Propose a new bounty.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
         * `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
         * or slashed when rejected.
         *
         * - `curator`: The curator account whom will manage this bounty.
         * - `fee`: The curator fee.
         * - `value`: The total payment amount of this bounty, curator fee included.
         * - `description`: The description of this bounty.
         */
        propose_bounty: TxDescriptor<Anonymize<I2a839vbf5817q>>;
        /**
         * Approve a bounty proposal. At a later time, the bounty will be funded and become active
         * and the original deposit will be returned.
         *
         * May only be called from `T::SpendOrigin`.
         *
         * ## Complexity
         * - O(1).
         */
        approve_bounty: TxDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
        /**
         * Propose a curator to a funded bounty.
         *
         * May only be called from `T::SpendOrigin`.
         *
         * ## Complexity
         * - O(1).
         */
        propose_curator: TxDescriptor<Anonymize<I42bqh279uf7oa>>;
        /**
         * Unassign curator from a bounty.
         *
         * This function can only be called by the `RejectOrigin` a signed origin.
         *
         * If this function is called by the `RejectOrigin`, we assume that the curator is
         * malicious or inactive. As a result, we will slash the curator when possible.
         *
         * If the origin is the curator, we take this as a sign they are unable to do their job and
         * they willingly give up. We could slash them, but for now we allow them to recover their
         * deposit and exit without issue. (We may want to change this if it is abused.)
         *
         * Finally, the origin can be anyone if and only if the curator is "inactive". This allows
         * anyone in the community to call out that a curator is not doing their due diligence, and
         * we should pick a new curator. In this case the curator should also be slashed.
         *
         * ## Complexity
         * - O(1).
         */
        unassign_curator: TxDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
        /**
         * Accept the curator role for a bounty.
         * A deposit will be reserved from curator and refund upon successful payout.
         *
         * May only be called from the curator.
         *
         * ## Complexity
         * - O(1).
         */
        accept_curator: TxDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
        /**
         * Award bounty to a beneficiary account. The beneficiary will be able to claim the funds
         * after a delay.
         *
         * The dispatch origin for this call must be the curator of this bounty.
         *
         * - `bounty_id`: Bounty ID to award.
         * - `beneficiary`: The beneficiary account whom will receive the payout.
         *
         * ## Complexity
         * - O(1).
         */
        award_bounty: TxDescriptor<Anonymize<I4p6v96cffstms>>;
        /**
         * Claim the payout from an awarded bounty after payout delay.
         *
         * The dispatch origin for this call must be the beneficiary of this bounty.
         *
         * - `bounty_id`: Bounty ID to claim.
         *
         * ## Complexity
         * - O(1).
         */
        claim_bounty: TxDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
        /**
         * Cancel a proposed or active bounty. All the funds will be sent to treasury and
         * the curator deposit will be unreserved if possible.
         *
         * Only `T::RejectOrigin` is able to cancel a bounty.
         *
         * - `bounty_id`: Bounty ID to cancel.
         *
         * ## Complexity
         * - O(1).
         */
        close_bounty: TxDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
        /**
         * Extend the expiry time of an active bounty.
         *
         * The dispatch origin for this call must be the curator of this bounty.
         *
         * - `bounty_id`: Bounty ID to extend.
         * - `remark`: additional information.
         *
         * ## Complexity
         * - O(1).
         */
        extend_bounty_expiry: TxDescriptor<Anonymize<I90n6nnkpdahrh>>;
        /**
         * Approve bountry and propose a curator simultaneously.
         * This call is a shortcut to calling `approve_bounty` and `propose_curator` separately.
         *
         * May only be called from `T::SpendOrigin`.
         *
         * - `bounty_id`: Bounty ID to approve.
         * - `curator`: The curator account whom will manage this bounty.
         * - `fee`: The curator fee.
         *
         * ## Complexity
         * - O(1).
         */
        approve_bounty_with_curator: TxDescriptor<Anonymize<I42bqh279uf7oa>>;
        /**
         * Poke the deposit reserved for creating a bounty proposal.
         *
         * This can be used by accounts to update their reserved amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `bounty_id`: The bounty id for which to adjust the deposit.
         *
         * If the deposit is updated, the difference will be reserved/unreserved from the
         * proposer's account.
         *
         * The transaction is made free if the deposit is updated and paid otherwise.
         *
         * Emits `DepositPoked` if the deposit is updated.
         */
        poke_deposit: TxDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
    };
    ChildBounties: {
        /**
         * Add a new child-bounty.
         *
         * The dispatch origin for this call must be the curator of parent
         * bounty and the parent bounty must be in "active" state.
         *
         * Child-bounty gets added successfully & fund gets transferred from
         * parent bounty to child-bounty account, if parent bounty has enough
         * funds, else the call fails.
         *
         * Upper bound to maximum number of active  child bounties that can be
         * added are managed via runtime trait config
         * [`Config::MaxActiveChildBountyCount`].
         *
         * If the call is success, the status of child-bounty is updated to
         * "Added".
         *
         * - `parent_bounty_id`: Index of parent bounty for which child-bounty is being added.
         * - `value`: Value for executing the proposal.
         * - `description`: Text description for the child-bounty.
         */
        add_child_bounty: TxDescriptor<Anonymize<I8mk5kjgn02hi8>>;
        /**
         * Propose curator for funded child-bounty.
         *
         * The dispatch origin for this call must be curator of parent bounty.
         *
         * Parent bounty must be in active state, for this child-bounty call to
         * work.
         *
         * Child-bounty must be in "Added" state, for processing the call. And
         * state of child-bounty is moved to "CuratorProposed" on successful
         * call completion.
         *
         * - `parent_bounty_id`: Index of parent bounty.
         * - `child_bounty_id`: Index of child bounty.
         * - `curator`: Address of child-bounty curator.
         * - `fee`: payment fee to child-bounty curator for execution.
         */
        propose_curator: TxDescriptor<Anonymize<Ieqvq91sbe02ko>>;
        /**
         * Accept the curator role for the child-bounty.
         *
         * The dispatch origin for this call must be the curator of this
         * child-bounty.
         *
         * A deposit will be reserved from the curator and refund upon
         * successful payout or cancellation.
         *
         * Fee for curator is deducted from curator fee of parent bounty.
         *
         * Parent bounty must be in active state, for this child-bounty call to
         * work.
         *
         * Child-bounty must be in "CuratorProposed" state, for processing the
         * call. And state of child-bounty is moved to "Active" on successful
         * call completion.
         *
         * - `parent_bounty_id`: Index of parent bounty.
         * - `child_bounty_id`: Index of child bounty.
         */
        accept_curator: TxDescriptor<Anonymize<I2gr10p66od9ch>>;
        /**
         * Unassign curator from a child-bounty.
         *
         * The dispatch origin for this call can be either `RejectOrigin`, or
         * the curator of the parent bounty, or any signed origin.
         *
         * For the origin other than T::RejectOrigin and the child-bounty
         * curator, parent bounty must be in active state, for this call to
         * work. We allow child-bounty curator and T::RejectOrigin to execute
         * this call irrespective of the parent bounty state.
         *
         * If this function is called by the `RejectOrigin` or the
         * parent bounty curator, we assume that the child-bounty curator is
         * malicious or inactive. As a result, child-bounty curator deposit is
         * slashed.
         *
         * If the origin is the child-bounty curator, we take this as a sign
         * that they are unable to do their job, and are willingly giving up.
         * We could slash the deposit, but for now we allow them to unreserve
         * their deposit and exit without issue. (We may want to change this if
         * it is abused.)
         *
         * Finally, the origin can be anyone iff the child-bounty curator is
         * "inactive". Expiry update due of parent bounty is used to estimate
         * inactive state of child-bounty curator.
         *
         * This allows anyone in the community to call out that a child-bounty
         * curator is not doing their due diligence, and we should pick a new
         * one. In this case the child-bounty curator deposit is slashed.
         *
         * State of child-bounty is moved to Added state on successful call
         * completion.
         *
         * - `parent_bounty_id`: Index of parent bounty.
         * - `child_bounty_id`: Index of child bounty.
         */
        unassign_curator: TxDescriptor<Anonymize<I2gr10p66od9ch>>;
        /**
         * Award child-bounty to a beneficiary.
         *
         * The beneficiary will be able to claim the funds after a delay.
         *
         * The dispatch origin for this call must be the parent curator or
         * curator of this child-bounty.
         *
         * Parent bounty must be in active state, for this child-bounty call to
         * work.
         *
         * Child-bounty must be in active state, for processing the call. And
         * state of child-bounty is moved to "PendingPayout" on successful call
         * completion.
         *
         * - `parent_bounty_id`: Index of parent bounty.
         * - `child_bounty_id`: Index of child bounty.
         * - `beneficiary`: Beneficiary account.
         */
        award_child_bounty: TxDescriptor<Anonymize<I9mcq66cm3gibo>>;
        /**
         * Claim the payout from an awarded child-bounty after payout delay.
         *
         * The dispatch origin for this call may be any signed origin.
         *
         * Call works independent of parent bounty state, No need for parent
         * bounty to be in active state.
         *
         * The Beneficiary is paid out with agreed bounty value. Curator fee is
         * paid & curator deposit is unreserved.
         *
         * Child-bounty must be in "PendingPayout" state, for processing the
         * call. And instance of child-bounty is removed from the state on
         * successful call completion.
         *
         * - `parent_bounty_id`: Index of parent bounty.
         * - `child_bounty_id`: Index of child bounty.
         */
        claim_child_bounty: TxDescriptor<Anonymize<I2gr10p66od9ch>>;
        /**
         * Cancel a proposed or active child-bounty. Child-bounty account funds
         * are transferred to parent bounty account. The child-bounty curator
         * deposit may be unreserved if possible.
         *
         * The dispatch origin for this call must be either parent curator or
         * `T::RejectOrigin`.
         *
         * If the state of child-bounty is `Active`, curator deposit is
         * unreserved.
         *
         * If the state of child-bounty is `PendingPayout`, call fails &
         * returns `PendingPayout` error.
         *
         * For the origin other than T::RejectOrigin, parent bounty must be in
         * active state, for this child-bounty call to work. For origin
         * T::RejectOrigin execution is forced.
         *
         * Instance of child-bounty is removed from the state on successful
         * call completion.
         *
         * - `parent_bounty_id`: Index of parent bounty.
         * - `child_bounty_id`: Index of child bounty.
         */
        close_child_bounty: TxDescriptor<Anonymize<I2gr10p66od9ch>>;
    };
    AssetRate: {
        /**
         * Initialize a conversion rate to native balance for the given asset.
         *
         * ## Complexity
         * - O(1)
         */
        create: TxDescriptor<Anonymize<I9c4d50jrp7as1>>;
        /**
         * Update the conversion rate to native balance for the given asset.
         *
         * ## Complexity
         * - O(1)
         */
        update: TxDescriptor<Anonymize<I9c4d50jrp7as1>>;
        /**
         * Remove an existing conversion rate to native balance for the given asset.
         *
         * ## Complexity
         * - O(1)
         */
        remove: TxDescriptor<Anonymize<Ifplevr9hp8jo3>>;
    };
    StateTrieMigration: {
        /**
         * Control the automatic migration.
         *
         * The dispatch origin of this call must be [`Config::ControlOrigin`].
         */
        control_auto_migration: TxDescriptor<Anonymize<I7psec5e6ghc64>>;
        /**
         * Continue the migration for the given `limits`.
         *
         * The dispatch origin of this call can be any signed account.
         *
         * This transaction has NO MONETARY INCENTIVES. calling it will not reward anyone. Albeit,
         * Upon successful execution, the transaction fee is returned.
         *
         * The (potentially over-estimated) of the byte length of all the data read must be
         * provided for up-front fee-payment and weighing. In essence, the caller is guaranteeing
         * that executing the current `MigrationTask` with the given `limits` will not exceed
         * `real_size_upper` bytes of read data.
         *
         * The `witness_task` is merely a helper to prevent the caller from being slashed or
         * generally trigger a migration that they do not intend. This parameter is just a message
         * from caller, saying that they believed `witness_task` was the last state of the
         * migration, and they only wish for their transaction to do anything, if this assumption
         * holds. In case `witness_task` does not match, the transaction fails.
         *
         * Based on the documentation of [`MigrationTask::migrate_until_exhaustion`], the
         * recommended way of doing this is to pass a `limit` that only bounds `count`, as the
         * `size` limit can always be overwritten.
         */
        continue_migrate: TxDescriptor<Anonymize<I2psb0sladd863>>;
        /**
         * Migrate the list of top keys by iterating each of them one by one.
         *
         * This does not affect the global migration process tracker ([`MigrationProcess`]), and
         * should only be used in case any keys are leftover due to a bug.
         */
        migrate_custom_top: TxDescriptor<Anonymize<I585tk8khua0gk>>;
        /**
         * Migrate the list of child keys by iterating each of them one by one.
         *
         * All of the given child keys must be present under one `child_root`.
         *
         * This does not affect the global migration process tracker ([`MigrationProcess`]), and
         * should only be used in case any keys are leftover due to a bug.
         */
        migrate_custom_child: TxDescriptor<Anonymize<I3ut99di214ru2>>;
        /**
         * Set the maximum limit of the signed migration.
         */
        set_signed_max_limits: TxDescriptor<Anonymize<Iemkp87d26vsbh>>;
        /**
         * Forcefully set the progress the running migration.
         *
         * This is only useful in one case: the next key to migrate is too big to be migrated with
         * a signed account, in a parachain context, and we simply want to skip it. A reasonable
         * example of this would be `:code:`, which is both very expensive to migrate, and commonly
         * used, so probably it is already migrated.
         *
         * In case you mess things up, you can also, in principle, use this to reset the migration
         * process.
         */
        force_set_progress: TxDescriptor<Anonymize<I4ahfrt5dscf6q>>;
    };
    Staking: {
        /**
         * Take the origin account as a stash and lock up `value` of its balance. `controller` will
         * be the account that controls it.
         *
         * `value` must be more than the `minimum_balance` specified by `T::Currency`.
         *
         * The dispatch origin for this call must be _Signed_ by the stash account.
         *
         * Emits `Bonded`.
         *
         * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
         * unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
         * as dust.
         */
        bond: TxDescriptor<Anonymize<I2eip8tc75dpje>>;
        /**
         * Add some extra amount that have appeared in the stash `free_balance` into the balance up
         * for staking.
         *
         * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
         *
         * Use this if there are additional funds in your stash account that you wish to bond.
         * Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
         * any limitation on the amount that can be added.
         *
         * Emits `Bonded`.
         */
        bond_extra: TxDescriptor<Anonymize<I564va64vtidbq>>;
        /**
         * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
         * period ends. If this leaves an amount actively bonded less than
         * [`asset::existential_deposit`], then it is increased to the full amount.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
         * the funds out of management ready for transfer.
         *
         * No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
         * can co-exists at the same time. If there are no unlocking chunks slots available
         * [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
         *
         * If a user encounters the `InsufficientBond` error when calling this extrinsic,
         * they should call `chill` first in order to free up their bonded funds.
         *
         * Emits `Unbonded`.
         *
         * See also [`Call::withdraw_unbonded`].
         */
        unbond: TxDescriptor<Anonymize<Ie5v6njpckr05b>>;
        /**
         * Remove any stake that has been fully unbonded and is ready for withdrawal.
         *
         * Stake is considered fully unbonded once [`Config::BondingDuration`] has elapsed since
         * the unbonding was initiated. In rare cases—such as when offences for the unbonded era
         * have been reported but not yet processed—withdrawal is restricted to eras for which
         * all offences have been processed.
         *
         * The unlocked stake will be returned as free balance in the stash account.
         *
         * The dispatch origin for this call must be _Signed_ by the controller.
         *
         * Emits `Withdrawn`.
         *
         * See also [`Call::unbond`].
         *
         * ## Parameters
         *
         * - `num_slashing_spans`: **Deprecated**. Retained only for backward compatibility; this
         * parameter has no effect.
         */
        withdraw_unbonded: TxDescriptor<Anonymize<I328av3j0bgmjb>>;
        /**
         * Declare the desire to validate for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        validate: TxDescriptor<Anonymize<I4tuqm9ato907i>>;
        /**
         * Declare the desire to nominate `targets` for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        nominate: TxDescriptor<Anonymize<Iagi89qt4h1lqg>>;
        /**
         * Declare no desire to either validate or nominate.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * ## Complexity
         * - Independent of the arguments. Insignificant complexity.
         * - Contains one read.
         * - Writes are limited to the `origin` account key.
         */
        chill: TxDescriptor<undefined>;
        /**
         * (Re-)set the payment target for a controller.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        set_payee: TxDescriptor<Anonymize<I9dgmcnuamt5p8>>;
        /**
         * (Re-)sets the controller of a stash to the stash itself. This function previously
         * accepted a `controller` argument to set the controller to an account other than the
         * stash itself. This functionality has now been removed, now only setting the controller
         * to the stash, if it is not already.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
         */
        set_controller: TxDescriptor<undefined>;
        /**
         * Sets the ideal number of validators.
         *
         * The dispatch origin must be Root.
         */
        set_validator_count: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Increments the ideal number of validators up to maximum of
         * `T::MaxValidatorSet`.
         *
         * The dispatch origin must be Root.
         */
        increase_validator_count: TxDescriptor<Anonymize<Ifhs60omlhvt3>>;
        /**
         * Scale up the ideal number of validators by a factor up to maximum of
         * `T::MaxValidatorSet`.
         *
         * The dispatch origin must be Root.
         */
        scale_validator_count: TxDescriptor<Anonymize<If34udpd5e57vi>>;
        /**
         * Force there to be no new eras indefinitely.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * Thus the election process may be ongoing when this is called. In this case the
         * election will continue until the next era is triggered.
         */
        force_no_eras: TxDescriptor<undefined>;
        /**
         * Force there to be a new era at the end of the next session. After this, it will be
         * reset to normal (non-forced) behaviour.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * If this is called just before a new era is triggered, the election process may not
         * have enough blocks to get a result.
         */
        force_new_era: TxDescriptor<undefined>;
        /**
         * Set the validators who cannot be slashed (if any).
         *
         * The dispatch origin must be Root.
         */
        set_invulnerables: TxDescriptor<Anonymize<I39t01nnod9109>>;
        /**
         * Force a current staker to become completely unstaked, immediately.
         *
         * The dispatch origin must be Root.
         * ## Parameters
         *
         * - `stash`: The stash account to be unstaked.
         * - `num_slashing_spans`: **Deprecated**. This parameter is retained for backward
         * compatibility. It no longer has any effect.
         */
        force_unstake: TxDescriptor<Anonymize<Ie5vbnd9198quk>>;
        /**
         * Force there to be a new era at the end of sessions indefinitely.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * If this is called just before a new era is triggered, the election process may not
         * have enough blocks to get a result.
         */
        force_new_era_always: TxDescriptor<undefined>;
        /**
         * Cancels scheduled slashes for a given era before they are applied.
         *
         * This function allows `T::AdminOrigin` to cancel pending slashes for specified validators
         * in a given era. The cancelled slashes are stored and will be checked when applying
         * slashes.
         *
         * ## Parameters
         * - `era`: The staking era for which slashes should be cancelled. This is the era where
         * the slash would be applied, not the era in which the offence was committed.
         * - `validator_slashes`: A list of validator stash accounts and their slash fractions to
         * be cancelled.
         */
        cancel_deferred_slash: TxDescriptor<Anonymize<Ib1db5b4tm2bvc>>;
        /**
         * Pay out next page of the stakers behind a validator for the given era.
         *
         * - `validator_stash` is the stash account of the validator.
         * - `era` may be any era between `[current_era - history_depth; current_era]`.
         *
         * The origin of this call must be _Signed_. Any account can call this function, even if
         * it is not one of the stakers.
         *
         * The reward payout could be paged in case there are too many nominators backing the
         * `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
         * specific page, use `payout_stakers_by_page`.`
         *
         * If all pages are claimed, it returns an error `InvalidPage`.
         */
        payout_stakers: TxDescriptor<Anonymize<I6k6jf8ncesuu3>>;
        /**
         * Rebond a portion of the stash scheduled to be unlocked.
         *
         * The dispatch origin must be signed by the controller.
         */
        rebond: TxDescriptor<Anonymize<Ie5v6njpckr05b>>;
        /**
         * Remove all data structures concerning a staker/stash once it is at a state where it can
         * be considered `dust` in the staking system. The requirements are:
         *
         * 1. the `total_balance` of the stash is below minimum bond.
         * 2. or, the `ledger.total` of the stash is below minimum bond.
         * 3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
         *
         * The former can happen in cases like a slash; the latter when a fully unbonded account
         * is still receiving staking rewards in `RewardDestination::Staked`.
         *
         * It can be called by anyone, as long as `stash` meets the above requirements.
         *
         * Refunds the transaction fees upon successful execution.
         *
         * ## Parameters
         *
         * - `stash`: The stash account to be reaped.
         * - `num_slashing_spans`: **Deprecated**. This parameter is retained for backward
         * compatibility. It no longer has any effect.
         */
        reap_stash: TxDescriptor<Anonymize<Ie5vbnd9198quk>>;
        /**
         * Remove the given nominations from the calling validator.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * - `who`: A list of nominator stash accounts who are nominating this validator which
         * should no longer be nominating this validator.
         *
         * Note: Making this call only makes sense if you first set the validator preferences to
         * block any further nominations.
         */
        kick: TxDescriptor<Anonymize<I3qhk481i120pk>>;
        /**
         * Update the various staking configurations .
         *
         * * `min_nominator_bond`: The minimum active bond needed to be a nominator.
         * * `min_validator_bond`: The minimum active bond needed to be a validator.
         * * `max_nominator_count`: The max number of users who can be a nominator at once. When
         * set to `None`, no limit is enforced.
         * * `max_validator_count`: The max number of users who can be a validator at once. When
         * set to `None`, no limit is enforced.
         * * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
         * should be filled in order for the `chill_other` transaction to work.
         * * `min_commission`: The minimum amount of commission that each validators must maintain.
         * This is checked only upon calling `validate`. Existing validators are not affected.
         *
         * RuntimeOrigin must be Root to call this function.
         *
         * NOTE: Existing nominators and validators will not be affected by this update.
         * to kick people under the new limits, `chill_other` should be called.
         */
        set_staking_configs: TxDescriptor<Anonymize<If1qr0kbbl298c>>;
        /**
         * Declare a `controller` to stop participating as either a validator or nominator.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_, but can be called by anyone.
         *
         * If the caller is the same as the controller being targeted, then no further checks are
         * enforced, and this function behaves just like `chill`.
         *
         * If the caller is different than the controller being targeted, the following conditions
         * must be met:
         *
         * * `controller` must belong to a nominator who has become non-decodable,
         *
         * Or:
         *
         * * A `ChillThreshold` must be set and checked which defines how close to the max
         * nominators or validators we must reach before users can start chilling one-another.
         * * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
         * how close we are to the threshold.
         * * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
         * if this is a person that should be chilled because they have not met the threshold
         * bond required.
         *
         * This can be helpful if bond requirements are updated, and we need to remove old users
         * who do not satisfy these requirements.
         */
        chill_other: TxDescriptor<Anonymize<Idl3umm12u5pa>>;
        /**
         * Force a validator to have at least the minimum commission. This will not affect a
         * validator who already has a commission greater than or equal to the minimum. Any account
         * can call this.
         */
        force_apply_min_commission: TxDescriptor<Anonymize<I5ont0141q9ss5>>;
        /**
         * Sets the minimum amount of commission that each validators must maintain.
         *
         * This call has lower privilege requirements than `set_staking_config` and can be called
         * by the `T::AdminOrigin`. Root can always call this.
         */
        set_min_commission: TxDescriptor<Anonymize<I3vh014cqgmrfd>>;
        /**
         * Pay out a page of the stakers behind a validator for the given era and page.
         *
         * - `validator_stash` is the stash account of the validator.
         * - `era` may be any era between `[current_era - history_depth; current_era]`.
         * - `page` is the page index of nominators to pay out with value between 0 and
         * `num_nominators / T::MaxExposurePageSize`.
         *
         * The origin of this call must be _Signed_. Any account can call this function, even if
         * it is not one of the stakers.
         *
         * If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
         * them, then the list of nominators is paged, with each page being capped at
         * [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
         * the call needs to be made for each page separately in order for all the nominators
         * backing a validator to receive the reward. The nominators are not sorted across pages
         * and so it should not be assumed the highest staker would be on the topmost page and vice
         * versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
         */
        payout_stakers_by_page: TxDescriptor<Anonymize<Ie6j49utvii126>>;
        /**
         * Migrates an account's `RewardDestination::Controller` to
         * `RewardDestination::Account(controller)`.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * This will waive the transaction fee if the `payee` is successfully migrated.
         */
        update_payee: TxDescriptor<Anonymize<I3v6ks33uluhnj>>;
        /**
         * Updates a batch of controller accounts to their corresponding stash account if they are
         * not the same. Ignores any controller accounts that do not exist, and does not operate if
         * the stash and controller are already the same.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin must be `T::AdminOrigin`.
         */
        deprecate_controller_batch: TxDescriptor<Anonymize<I3kiiim1cds68i>>;
        /**
         * Restores the state of a ledger which is in an inconsistent state.
         *
         * The requirements to restore a ledger are the following:
         * * The stash is bonded; or
         * * The stash is not bonded but it has a staking lock left behind; or
         * * If the stash has an associated ledger and its state is inconsistent; or
         * * If the ledger is not corrupted *but* its staking lock is out of sync.
         *
         * The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
         * ledger associated with the stash. If the input parameters are not set, the ledger will
         * be reset values from on-chain state.
         */
        restore_ledger: TxDescriptor<Anonymize<I4k60mkh2r6jjg>>;
        /**
         * Migrates permissionlessly a stash from locks to holds.
         *
         * This removes the old lock on the stake and creates a hold on it atomically. If all
         * stake cannot be held, the best effort is made to hold as much as possible. The remaining
         * stake is removed from the ledger.
         *
         * The fee is waived if the migration is successful.
         */
        migrate_currency: TxDescriptor<Anonymize<Idl3umm12u5pa>>;
        /**
         * Manually and permissionlessly applies a deferred slash for a given era.
         *
         * Normally, slashes are automatically applied shortly after the start of the `slash_era`.
         * The automatic application of slashes is handled by the pallet's internal logic, and it
         * tries to apply one slash page per block of the era.
         * If for some reason, one era is not enough for applying all slash pages, the remaining
         * slashes need to be manually (permissionlessly) applied.
         *
         * For a given era x, if at era x+1, slashes are still unapplied, all withdrawals get
         * blocked, and these need to be manually applied by calling this function.
         * This function exists as a **fallback mechanism** for this extreme situation, but we
         * never expect to encounter this in normal scenarios.
         *
         * The parameters for this call can be queried by looking at the `UnappliedSlashes` storage
         * for eras older than the active era.
         *
         * ## Parameters
         * - `slash_era`: The staking era in which the slash was originally scheduled.
         * - `slash_key`: A unique identifier for the slash, represented as a tuple:
         * - `stash`: The stash account of the validator being slashed.
         * - `slash_fraction`: The fraction of the stake that was slashed.
         * - `page_index`: The index of the exposure page being processed.
         *
         * ## Behavior
         * - The function is **permissionless**—anyone can call it.
         * - The `slash_era` **must be the current era or a past era**.
         * If it is in the future, the
         * call fails with `EraNotStarted`.
         * - The fee is waived if the slash is successfully applied.
         *
         * ## Future Improvement
         * - Implement an **off-chain worker (OCW) task** to automatically apply slashes when there
         * is unused block space, improving efficiency.
         */
        apply_slash: TxDescriptor<Anonymize<I70mou2rha6f5o>>;
        /**
         * Perform one step of era pruning to prevent PoV size exhaustion from unbounded deletions.
         *
         * This extrinsic enables permissionless lazy pruning of era data by performing
         * incremental deletion of storage items. Each call processes a limited number
         * of items based on available block weight to avoid exceeding block limits.
         *
         * Returns `Pays::No` when work is performed to incentivize regular maintenance.
         * Anyone can call this to help maintain the chain's storage health.
         *
         * The era must be eligible for pruning (older than HistoryDepth + 1).
         * Check `EraPruningState` storage to see if an era needs pruning before calling.
         */
        prune_era_step: TxDescriptor<Anonymize<I9bur6p3ovq9mo>>;
    };
    NominationPools: {
        /**
         * Stake funds with a pool. The amount to bond is delegated (or transferred based on
         * [`adapter::StakeStrategyType`]) from the member to the pool account and immediately
         * increases the pool's bond.
         *
         * The method of transferring the amount to the pool account is determined by
         * [`adapter::StakeStrategyType`]. If the pool is configured to use
         * [`adapter::StakeStrategyType::Delegate`], the funds remain in the account of
         * the `origin`, while the pool gains the right to use these funds for staking.
         *
         * # Note
         *
         * * An account can only be a member of a single pool.
         * * An account cannot join the same pool multiple times.
         * * This call will *not* dust the member account, so the member must have at least
         * `existential deposit + amount` in their account.
         * * Only a pool with [`PoolState::Open`] can be joined
         */
        join: TxDescriptor<Anonymize<Ieg1oc56mamrl5>>;
        /**
         * Bond `extra` more funds from `origin` into the pool to which they already belong.
         *
         * Additional funds can come from either the free balance of the account, of from the
         * accumulated rewards, see [`BondExtra`].
         *
         * Bonding extra funds implies an automatic payout of all pending rewards as well.
         * See `bond_extra_other` to bond pending rewards of `other` members.
         */
        bond_extra: TxDescriptor<Anonymize<I2vu5vj7173ik9>>;
        /**
         * A bonded member can use this to claim their payout based on the rewards that the pool
         * has accumulated since their last claimed payout (OR since joining if this is their first
         * time claiming rewards). The payout will be transferred to the member's account.
         *
         * The member will earn rewards pro rata based on the members stake vs the sum of the
         * members in the pools stake. Rewards do not "expire".
         *
         * See `claim_payout_other` to claim rewards on behalf of some `other` pool member.
         */
        claim_payout: TxDescriptor<undefined>;
        /**
         * Unbond up to `unbonding_points` of the `member_account`'s funds from the pool. It
         * implicitly collects the rewards one last time, since not doing so would mean some
         * rewards would be forfeited.
         *
         * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
         * account).
         *
         * # Conditions for a permissionless dispatch.
         *
         * * The pool is blocked and the caller is either the root or bouncer. This is refereed to
         * as a kick.
         * * The pool is destroying and the member is not the depositor.
         * * The pool is destroying, the member is the depositor and no other members are in the
         * pool.
         *
         * ## Conditions for permissioned dispatch (i.e. the caller is also the
         * `member_account`):
         *
         * * The caller is not the depositor.
         * * The caller is the depositor, the pool is destroying and no other members are in the
         * pool.
         *
         * # Note
         *
         * If there are too many unlocking chunks to unbond with the pool account,
         * [`Call::pool_withdraw_unbonded`] can be called to try and minimize unlocking chunks.
         * The [`StakingInterface::unbond`] will implicitly call [`Call::pool_withdraw_unbonded`]
         * to try to free chunks if necessary (ie. if unbound was called and no unlocking chunks
         * are available). However, it may not be possible to release the current unlocking chunks,
         * in which case, the result of this call will likely be the `NoMoreChunks` error from the
         * staking system.
         */
        unbond: TxDescriptor<Anonymize<I6galqkn58q3bl>>;
        /**
         * Call `withdraw_unbonded` for the pools account. This call can be made by any account.
         *
         * This is useful if there are too many unlocking chunks to call `unbond`, and some
         * can be cleared by withdrawing. In the case there are too many unlocking chunks, the user
         * would probably see an error like `NoMoreChunks` emitted from the staking system when
         * they attempt to unbond.
         */
        pool_withdraw_unbonded: TxDescriptor<Anonymize<I36uoc8t9liv80>>;
        /**
         * Withdraw unbonded funds from `member_account`. If no bonded funds can be unbonded, an
         * error is returned.
         *
         * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
         * account).
         *
         * # Conditions for a permissionless dispatch
         *
         * * The pool is in destroy mode and the target is not the depositor.
         * * The target is the depositor and they are the only member in the sub pools.
         * * The pool is blocked and the caller is either the root or bouncer.
         *
         * # Conditions for permissioned dispatch
         *
         * * The caller is the target and they are not the depositor.
         *
         * # Note
         *
         * - If the target is the depositor, the pool will be destroyed.
         * - If the pool has any pending slash, we also try to slash the member before letting them
         * withdraw. This calculation adds some weight overhead and is only defensive. In reality,
         * pool slashes must have been already applied via permissionless [`Call::apply_slash`].
         */
        withdraw_unbonded: TxDescriptor<Anonymize<Ibunghsg9qa7f7>>;
        /**
         * Create a new delegation pool.
         *
         * # Arguments
         *
         * * `amount` - The amount of funds to delegate to the pool. This also acts of a sort of
         * deposit since the pools creator cannot fully unbond funds until the pool is being
         * destroyed.
         * * `index` - A disambiguation index for creating the account. Likely only useful when
         * creating multiple pools in the same extrinsic.
         * * `root` - The account to set as [`PoolRoles::root`].
         * * `nominator` - The account to set as the [`PoolRoles::nominator`].
         * * `bouncer` - The account to set as the [`PoolRoles::bouncer`].
         *
         * # Note
         *
         * In addition to `amount`, the caller will transfer the existential deposit; so the caller
         * needs at have at least `amount + existential_deposit` transferable.
         */
        create: TxDescriptor<Anonymize<I8qnouj2c0igph>>;
        /**
         * Create a new delegation pool with a previously used pool id
         *
         * # Arguments
         *
         * same as `create` with the inclusion of
         * * `pool_id` - `A valid PoolId.
         */
        create_with_pool_id: TxDescriptor<Anonymize<Ic30e2k517a3ns>>;
        /**
         * Nominate on behalf of the pool.
         *
         * The dispatch origin of this call must be signed by the pool nominator or the pool
         * root role.
         *
         * This directly forwards the call to an implementation of `StakingInterface` (e.g.,
         * `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool.
         *
         * # Note
         *
         * In addition to a `root` or `nominator` role of `origin`, the pool's depositor needs to
         * have at least `depositor_min_bond` in the pool to start nominating.
         */
        nominate: TxDescriptor<Anonymize<I47a2tsd2o2b1c>>;
        /**
         * Set a new state for the pool.
         *
         * If a pool is already in the `Destroying` state, then under no condition can its state
         * change again.
         *
         * The dispatch origin of this call must be either:
         *
         * 1. signed by the bouncer, or the root role of the pool,
         * 2. if the pool conditions to be open are NOT met (as described by `ok_to_be_open`), and
         * then the state of the pool can be permissionlessly changed to `Destroying`.
         */
        set_state: TxDescriptor<Anonymize<Ifc9k1s0e9nv8e>>;
        /**
         * Set a new metadata for the pool.
         *
         * The dispatch origin of this call must be signed by the bouncer, or the root role of the
         * pool.
         */
        set_metadata: TxDescriptor<Anonymize<I4ihj26hl75e5p>>;
        /**
         * Update configurations for the nomination pools. The origin for this call must be
         * [`Config::AdminOrigin`].
         *
         * # Arguments
         *
         * * `min_join_bond` - Set [`MinJoinBond`].
         * * `min_create_bond` - Set [`MinCreateBond`].
         * * `max_pools` - Set [`MaxPools`].
         * * `max_members` - Set [`MaxPoolMembers`].
         * * `max_members_per_pool` - Set [`MaxPoolMembersPerPool`].
         * * `global_max_commission` - Set [`GlobalMaxCommission`].
         */
        set_configs: TxDescriptor<Anonymize<I2dl8ekhm2t22h>>;
        /**
         * Update the roles of the pool.
         *
         * The root is the only entity that can change any of the roles, including itself,
         * excluding the depositor, who can never change.
         *
         * It emits an event, notifying UIs of the role change. This event is quite relevant to
         * most pool members and they should be informed of changes to pool roles.
         */
        update_roles: TxDescriptor<Anonymize<I13us5e5h5645o>>;
        /**
         * Chill on behalf of the pool.
         *
         * The dispatch origin of this call can be signed by the pool nominator or the pool
         * root role, same as [`Pallet::nominate`].
         *
         * This directly forwards the call to an implementation of `StakingInterface` (e.g.,
         * `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool.
         *
         * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
         * account).
         *
         * # Conditions for a permissionless dispatch:
         * * When pool depositor has less than `MinNominatorBond` staked, otherwise pool members
         * are unable to unbond.
         *
         * # Conditions for permissioned dispatch:
         * * The caller is the pool's nominator or root.
         */
        chill: TxDescriptor<Anonymize<I931cottvong90>>;
        /**
         * `origin` bonds funds from `extra` for some pool member `member` into their respective
         * pools.
         *
         * `origin` can bond extra funds from free balance or pending rewards when `origin ==
         * other`.
         *
         * In the case of `origin != other`, `origin` can only bond extra pending rewards of
         * `other` members assuming set_claim_permission for the given member is
         * `PermissionlessCompound` or `PermissionlessAll`.
         */
        bond_extra_other: TxDescriptor<Anonymize<I7sujb8gfvuo7n>>;
        /**
         * Allows a pool member to set a claim permission to allow or disallow permissionless
         * bonding and withdrawing.
         *
         * # Arguments
         *
         * * `origin` - Member of a pool.
         * * `permission` - The permission to be applied.
         */
        set_claim_permission: TxDescriptor<Anonymize<I1ors0vru14it3>>;
        /**
         * `origin` can claim payouts on some pool member `other`'s behalf.
         *
         * Pool member `other` must have a `PermissionlessWithdraw` or `PermissionlessAll` claim
         * permission for this call to be successful.
         */
        claim_payout_other: TxDescriptor<Anonymize<I40s11r8nagn2g>>;
        /**
         * Set the commission of a pool.
         * Both a commission percentage and a commission payee must be provided in the `current`
         * tuple. Where a `current` of `None` is provided, any current commission will be removed.
         *
         * - If a `None` is supplied to `new_commission`, existing commission will be removed.
         */
        set_commission: TxDescriptor<Anonymize<I6bjj87fr5g9nl>>;
        /**
         * Set the maximum commission of a pool.
         *
         * - Initial max can be set to any `Perbill`, and only smaller values thereafter.
         * - Current commission will be lowered in the event it is higher than a new max
         * commission.
         */
        set_commission_max: TxDescriptor<Anonymize<I8cbluptqo8kbp>>;
        /**
         * Set the commission change rate for a pool.
         *
         * Initial change rate is not bounded, whereas subsequent updates can only be more
         * restrictive than the current.
         */
        set_commission_change_rate: TxDescriptor<Anonymize<I81cc4plffa1dm>>;
        /**
         * Claim pending commission.
         *
         * The `root` role of the pool is _always_ allowed to claim the pool's commission.
         *
         * If the pool has set `CommissionClaimPermission::Permissionless`, then any account can
         * trigger the process of claiming the pool's commission.
         *
         * If the pool has set its `CommissionClaimPermission` to `Account(acc)`, then only
         * accounts
         * * `acc`, and
         * * the pool's root account
         *
         * may call this extrinsic on behalf of the pool.
         *
         * Pending commissions are paid out and added to the total claimed commission.
         * The total pending commission is reset to zero.
         */
        claim_commission: TxDescriptor<Anonymize<I931cottvong90>>;
        /**
         * Top up the deficit or withdraw the excess ED from the pool.
         *
         * When a pool is created, the pool depositor transfers ED to the reward account of the
         * pool. ED is subject to change and over time, the deposit in the reward account may be
         * insufficient to cover the ED deficit of the pool or vice-versa where there is excess
         * deposit to the pool. This call allows anyone to adjust the ED deposit of the
         * pool by either topping up the deficit or claiming the excess.
         */
        adjust_pool_deposit: TxDescriptor<Anonymize<I931cottvong90>>;
        /**
         * Set or remove a pool's commission claim permission.
         *
         * Determines who can claim the pool's pending commission. Only the `Root` role of the pool
         * is able to configure commission claim permissions.
         */
        set_commission_claim_permission: TxDescriptor<Anonymize<I3ihan8icf0c5k>>;
        /**
         * Apply a pending slash on a member.
         *
         * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
         * [`adapter::StakeStrategyType::Delegate`].
         *
         * The pending slash amount of the member must be equal or more than `ExistentialDeposit`.
         * This call can be dispatched permissionlessly (i.e. by any account). If the execution
         * is successful, fee is refunded and caller may be rewarded with a part of the slash
         * based on the [`crate::pallet::Config::StakeAdapter`] configuration.
         */
        apply_slash: TxDescriptor<Anonymize<I7ibh0fckqou49>>;
        /**
         * Migrates delegated funds from the pool account to the `member_account`.
         *
         * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
         * [`adapter::StakeStrategyType::Delegate`].
         *
         * This is a permission-less call and refunds any fee if claim is successful.
         *
         * If the pool has migrated to delegation based staking, the staked tokens of pool members
         * can be moved and held in their own account. See [`adapter::DelegateStake`]
         */
        migrate_delegation: TxDescriptor<Anonymize<I7ibh0fckqou49>>;
        /**
         * Migrate pool from [`adapter::StakeStrategyType::Transfer`] to
         * [`adapter::StakeStrategyType::Delegate`].
         *
         * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
         * [`adapter::StakeStrategyType::Delegate`].
         *
         * This call can be dispatched permissionlessly, and refunds any fee if successful.
         *
         * If the pool has already migrated to delegation based staking, this call will fail.
         */
        migrate_pool_to_delegate_stake: TxDescriptor<Anonymize<I931cottvong90>>;
    };
    VoterList: {
        /**
         * Declare that some `dislocated` account has, through rewards or penalties, sufficiently
         * changed its score that it should properly fall into a different bag than its current
         * one.
         *
         * Anyone can call this function about any potentially dislocated account.
         *
         * Will always update the stored score of `dislocated` to the correct score, based on
         * `ScoreProvider`.
         *
         * If `dislocated` does not exists, it returns an error.
         */
        rebag: TxDescriptor<Anonymize<Id9js0aucdivjk>>;
        /**
         * Move the caller's Id directly in front of `lighter`.
         *
         * The dispatch origin for this call must be _Signed_ and can only be called by the Id of
         * the account going in front of `lighter`. Fee is payed by the origin under all
         * circumstances.
         *
         * Only works if:
         *
         * - both nodes are within the same bag,
         * - and `origin` has a greater `Score` than `lighter`.
         */
        put_in_front_of: TxDescriptor<Anonymize<I1vj3e1a62je3o>>;
        /**
         * Same as [`Pallet::put_in_front_of`], but it can be called by anyone.
         *
         * Fee is paid by the origin under all circumstances.
         */
        put_in_front_of_other: TxDescriptor<Anonymize<I6c1t14l6giceg>>;
    };
    StakingRcClient: {
        /**
         * Called to indicate the start of a new session on the relay chain.
         */
        relay_session_report: TxDescriptor<Anonymize<Ibqeqpelookfc7>>;
        /**
         * Called to report one or more new offenses on the relay chain.
         */
        relay_new_offence: TxDescriptor<Anonymize<I2ecpo819cust3>>;
    };
    MultiBlockElection: {
        /**
         * Manage this pallet.
         *
         * The origin of this call must be [`Config::AdminOrigin`].
         *
         * See [`AdminOperation`] for various operations that are possible.
         */
        manage: TxDescriptor<Anonymize<I9t5mbeod559uq>>;
    };
    MultiBlockElectionUnsigned: {
        /**
         * Submit an unsigned solution.
         *
         * This works very much like an inherent, as only the validators are permitted to submit
         * anything. By default validators will compute this call in their `offchain_worker` hook
         * and try and submit it back.
         *
         * This is different from signed page submission mainly in that the solution page is
         * verified on the fly.
         *
         * The `paged_solution` may contain at most [`Config::MinerPages`] pages. They are
         * interpreted as msp -> lsp, as per [`crate::Pallet::msp_range_for`].
         *
         * For example, if `Pages = 4`, and `MinerPages = 2`, our full snapshot range would be [0,
         * 1, 2, 3], with 3 being msp. But, in this case, then the `paged_raw_solution.pages` is
         * expected to correspond to `[snapshot(2), snapshot(3)]`.
         */
        submit_unsigned: TxDescriptor<Anonymize<Ib8qhbmc61qu95>>;
    };
    MultiBlockElectionSigned: {
        /**
         * Register oneself for an upcoming signed election.
         */
        register: TxDescriptor<Anonymize<I6041egnb3am04>>;
        /**
         * Submit a single page of a solution.
         *
         * Must always come after [`Pallet::register`].
         *
         * `maybe_solution` can be set to `None` to erase the page.
         *
         * Collects deposits from the signed origin based on [`Config::DepositBase`] and
         * [`Config::DepositPerPage`].
         */
        submit_page: TxDescriptor<Anonymize<I7ej7mean6mih8>>;
        /**
         * Retract a submission.
         *
         * A portion of the deposit may be returned, based on the [`Config::BailoutGraceRatio`].
         *
         * This will fully remove the solution from storage.
         */
        bail: TxDescriptor<undefined>;
        /**
         * Clear the data of a submitter form an old round.
         *
         * The dispatch origin of this call must be signed, and the original submitter.
         *
         * This can only be called for submissions that end up being discarded, as in they are not
         * processed and they end up lingering in the queue.
         */
        clear_old_round_data: TxDescriptor<Anonymize<Iehi3mdadqmlp5>>;
        /**
         * Set the invulnerable list.
         *
         * Dispatch origin must the the same as [`crate::Config::AdminOrigin`].
         */
        set_invulnerables: TxDescriptor<Anonymize<Id9gv8k0nmtfsc>>;
    };
    Sudo: {
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        sudo: TxDescriptor<Anonymize<Ia3okqcb5ev76q>>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        sudo_unchecked_weight: TxDescriptor<Anonymize<I8m94rr7prdld2>>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        set_key: TxDescriptor<Anonymize<I8k3rnvpeeh4hv>>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        sudo_as: TxDescriptor<Anonymize<I5gu565o01hrbm>>;
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        remove_key: TxDescriptor<undefined>;
    };
    AhOps: {
        /**
         * Unreserve the deposit that was taken for creating a crowdloan.
         *
         * This can be called by any signed origin. It unreserves the lease deposit on the account
         * that won the lease auction. It can be unreserved once all leases expired. Note that it
         * will be called automatically from `withdraw_crowdloan_contribution` for the matching
         * crowdloan account.
         *
         * Solo bidder accounts that won lease auctions can use this to unreserve their amount.
         */
        unreserve_lease_deposit: TxDescriptor<Anonymize<Ikkngcosp7bof>>;
        /**
         * Withdraw the contribution of a finished crowdloan.
         *
         * A crowdloan contribution can be withdrawn if either:
         * - The crowdloan failed to in an auction and timed out
         * - Won an auction and all leases expired
         *
         * Can be called by any signed origin.
         */
        withdraw_crowdloan_contribution: TxDescriptor<Anonymize<Ikkngcosp7bof>>;
        /**
         * Unreserve the deposit that was taken for creating a crowdloan.
         *
         * This can be called once either:
         * - The crowdloan failed to win an auction and timed out
         * - Won an auction, all leases expired and all contributions are withdrawn
         *
         * Can be called by any signed origin. The condition that all contributions are withdrawn
         * is in place since the reserve acts as a storage deposit.
         */
        unreserve_crowdloan_reserve: TxDescriptor<Anonymize<Ikkngcosp7bof>>;
        /**
         * Transfer the balance from the pre-migration treasury account to the post-migration
         * treasury account.
         *
         * This call can only be called after the migration is completed.
         */
        transfer_to_post_migration_treasury: TxDescriptor<Anonymize<I22bm4d7re21j9>>;
    };
    AhMigrator: {
        /**
         * Receive accounts from the Relay Chain.
         *
         * The accounts sent with `pallet_rc_migrator::Pallet::migrate_accounts` function.
         */
        receive_accounts: TxDescriptor<Anonymize<Ifioonc6ic974t>>;
        /**
         * Receive multisigs from the Relay Chain.
         *
         * This will be called from an XCM `Transact` inside a DMP from the relay chain. The
         * multisigs were prepared by
         * `pallet_rc_migrator::multisig::MultisigMigrator::migrate_many`.
         */
        receive_multisigs: TxDescriptor<Anonymize<I72qfv83rhp4qr>>;
        /**
         * Receive proxies from the Relay Chain.
         */
        receive_proxy_proxies: TxDescriptor<Anonymize<I6jgv29n0phb3f>>;
        /**
         * Receive proxy announcements from the Relay Chain.
         */
        receive_proxy_announcements: TxDescriptor<Anonymize<Ibcsrif5qnktv4>>;
        /**
        
         */
        receive_preimage_chunks: TxDescriptor<Anonymize<Ifsa6pjvc8t5vn>>;
        /**
        
         */
        receive_preimage_request_status: TxDescriptor<Anonymize<I64udjlb3l43q9>>;
        /**
        
         */
        receive_preimage_legacy_status: TxDescriptor<Anonymize<Ic0j854aucsgjh>>;
        /**
        
         */
        receive_nom_pools_messages: TxDescriptor<Anonymize<I2gvrhmhj0moqc>>;
        /**
        
         */
        receive_vesting_schedules: TxDescriptor<Anonymize<I65qh88839sl2u>>;
        /**
         * Receive referendum counts, deciding counts, votes for the track queue.
         */
        receive_referenda_values: TxDescriptor<Anonymize<I43641g81fhl82>>;
        /**
         * Receive referendums from the Relay Chain.
         */
        receive_referendums: TxDescriptor<Anonymize<I9ibr6lih6j2ou>>;
        /**
        
         */
        receive_claims: TxDescriptor<Anonymize<I935tki4voiobr>>;
        /**
        
         */
        receive_bags_list_messages: TxDescriptor<Anonymize<I4j0tlbg1g4hnk>>;
        /**
        
         */
        receive_scheduler_messages: TxDescriptor<Anonymize<Ifqt5asg9c3kl9>>;
        /**
        
         */
        receive_indices: TxDescriptor<Anonymize<I9ii4hnjt4vc2j>>;
        /**
        
         */
        receive_conviction_voting_messages: TxDescriptor<Anonymize<Idjvt48j5plqih>>;
        /**
        
         */
        receive_bounties_messages: TxDescriptor<Anonymize<I1gnvp8b47fj27>>;
        /**
        
         */
        receive_asset_rates: TxDescriptor<Anonymize<Iavl169paa5dbb>>;
        /**
        
         */
        receive_crowdloan_messages: TxDescriptor<Anonymize<I835djvt3d32hf>>;
        /**
        
         */
        receive_referenda_metadata: TxDescriptor<Anonymize<I3ktkk856tqa2t>>;
        /**
        
         */
        receive_treasury_messages: TxDescriptor<Anonymize<I57cq79pckivve>>;
        /**
        
         */
        receive_scheduler_agenda_messages: TxDescriptor<Anonymize<I8hv3mpjd5kvbj>>;
        /**
        
         */
        receive_delegated_staking_messages: TxDescriptor<Anonymize<I2tap0v9vk3h8h>>;
        /**
        
         */
        receive_child_bounties_messages: TxDescriptor<Anonymize<Id55jp9esfn3s7>>;
        /**
        
         */
        receive_staking_messages: TxDescriptor<Anonymize<I3jftp5j4o8mk5>>;
        /**
         * Set the migration stage.
         *
         * This call is intended for emergency use only and is guarded by the
         * [`Config::AdminOrigin`].
         */
        force_set_stage: TxDescriptor<Anonymize<I4h3fd1igkg3mr>>;
        /**
         * Start the data migration.
         *
         * This is typically called by the Relay Chain to start the migration on the Asset Hub and
         * receive a handshake message indicating the Asset Hub's readiness.
         */
        start_migration: TxDescriptor<undefined>;
        /**
         * Set the DMP queue priority configuration.
         *
         * Can only be called by the `AdminOrigin`.
         */
        set_dmp_queue_priority: TxDescriptor<Anonymize<I5sgsmd01vj1nq>>;
        /**
         * Set the manager account id.
         *
         * The manager has the similar to [`Config::AdminOrigin`] privileges except that it
         * can not set the manager account id via `set_manager` call.
         */
        set_manager: TxDescriptor<Anonymize<I6kmjpgojp035v>>;
        /**
         * Finish the migration.
         *
         * This is typically called by the Relay Chain to signal the migration has finished.
         *
         * The `data` parameter might be `None` if we are running the migration for a second time
         * for some pallets and have already performed the checking account balance correction,
         * so we do not need to do it this time.
         */
        finish_migration: TxDescriptor<Anonymize<I7j4pupt7e71k2>>;
        /**
         * XCM send call identical to the [`pallet_xcm::Pallet::send`] call but with the
         * [Config::SendXcm] router which will be able to send messages to the Relay Chain during
         * the migration.
         */
        send_xcm_message: TxDescriptor<Anonymize<Ia5cotcvi888ln>>;
    };
};
type IEvent = {
    System: {
        /**
         * An extrinsic completed successfully.
         */
        ExtrinsicSuccess: PlainDescriptor<Anonymize<Ia82mnkmeo2rhc>>;
        /**
         * An extrinsic failed.
         */
        ExtrinsicFailed: PlainDescriptor<Anonymize<I4avs19249gp1r>>;
        /**
         * `:code` was updated.
         */
        CodeUpdated: PlainDescriptor<undefined>;
        /**
         * A new account was created.
         */
        NewAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * An account was reaped.
         */
        KilledAccount: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
        /**
         * On on-chain remark happened.
         */
        Remarked: PlainDescriptor<Anonymize<I855j4i3kr8ko1>>;
        /**
         * A [`Task`] has started executing
         */
        TaskStarted: PlainDescriptor<Anonymize<I3m5sq54sjdlso>>;
        /**
         * A [`Task`] has finished executing.
         */
        TaskCompleted: PlainDescriptor<Anonymize<I3m5sq54sjdlso>>;
        /**
         * A [`Task`] failed during execution.
         */
        TaskFailed: PlainDescriptor<Anonymize<Ifdanns64t6ntc>>;
        /**
         * An upgrade was authorized.
         */
        UpgradeAuthorized: PlainDescriptor<Anonymize<Ibgl04rn6nbfm6>>;
        /**
         * An invalid authorized upgrade was rejected while trying to apply it.
         */
        RejectedInvalidAuthorizedUpgrade: PlainDescriptor<Anonymize<I6n2fpfj4igffj>>;
    };
    ParachainSystem: {
        /**
         * The validation function has been scheduled to apply.
         */
        ValidationFunctionStored: PlainDescriptor<undefined>;
        /**
         * The validation function was applied as of the contained relay chain block number.
         */
        ValidationFunctionApplied: PlainDescriptor<Anonymize<Idd7hd99u0ho0n>>;
        /**
         * The relay-chain aborted the upgrade process.
         */
        ValidationFunctionDiscarded: PlainDescriptor<undefined>;
        /**
         * Some downward messages have been received and will be processed.
         */
        DownwardMessagesReceived: PlainDescriptor<Anonymize<Iafscmv8tjf0ou>>;
        /**
         * Downward messages were processed using the given weight.
         */
        DownwardMessagesProcessed: PlainDescriptor<Anonymize<I100l07kaehdlp>>;
        /**
         * An upward message was sent to the relay chain.
         */
        UpwardMessageSent: PlainDescriptor<Anonymize<I6gnbnvip5vvdi>>;
    };
    Preimage: {
        /**
         * A preimage has been noted.
         */
        Noted: PlainDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * A preimage has been requested.
         */
        Requested: PlainDescriptor<Anonymize<I1jm8m1rh9e20v>>;
        /**
         * A preimage has ben cleared.
         */
        Cleared: PlainDescriptor<Anonymize<I1jm8m1rh9e20v>>;
    };
    Scheduler: {
        /**
         * Scheduled some task.
         */
        Scheduled: PlainDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Canceled some task.
         */
        Canceled: PlainDescriptor<Anonymize<I5n4sebgkfr760>>;
        /**
         * Dispatched some task.
         */
        Dispatched: PlainDescriptor<Anonymize<I1vpjc8661urf4>>;
        /**
         * Set a retry configuration for some task.
         */
        RetrySet: PlainDescriptor<Anonymize<Ia3c82eadg79bj>>;
        /**
         * Cancel a retry configuration for some task.
         */
        RetryCancelled: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The call for the provided hash was not found so the task has been aborted.
         */
        CallUnavailable: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The given task was unable to be renewed since the agenda is full at that block.
         */
        PeriodicFailed: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The given task was unable to be retried since the agenda is full at that block or there
         * was not enough weight to reschedule it.
         */
        RetryFailed: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * The given task can never be executed since it is overweight.
         */
        PermanentlyOverweight: PlainDescriptor<Anonymize<Ienusoeb625ftq>>;
        /**
         * Agenda is incomplete from `when`.
         */
        AgendaIncomplete: PlainDescriptor<Anonymize<Ibtsa3docbr9el>>;
    };
    Parameters: {
        /**
         * A Parameter was set.
         *
         * Is also emitted when the value was not changed.
         */
        Updated: PlainDescriptor<Anonymize<Icusb76knakdp5>>;
    };
    Balances: {
        /**
         * An account was created with some free balance.
         */
        Endowed: PlainDescriptor<Anonymize<Icv68aq8841478>>;
        /**
         * An account was removed whose balance was non-zero but below ExistentialDeposit,
         * resulting in an outright loss.
         */
        DustLost: PlainDescriptor<Anonymize<Ic262ibdoec56a>>;
        /**
         * Transfer succeeded.
         */
        Transfer: PlainDescriptor<Anonymize<Iflcfm9b6nlmdd>>;
        /**
         * A balance was set by root.
         */
        BalanceSet: PlainDescriptor<Anonymize<Ijrsf4mnp3eka>>;
        /**
         * Some balance was reserved (moved from free to reserved).
         */
        Reserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was unreserved (moved from reserved to free).
         */
        Unreserved: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was moved from the reserve of the first account to the second account.
         * Final argument indicates the destination balance type.
         */
        ReserveRepatriated: PlainDescriptor<Anonymize<I8tjvj9uq4b7hi>>;
        /**
         * Some amount was deposited (e.g. for transaction fees).
         */
        Deposit: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was withdrawn from the account (e.g. for transaction fees).
         */
        Withdraw: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was removed from the account (e.g. for misbehavior).
         */
        Slashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was minted into an account.
         */
        Minted: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was burned from an account.
         */
        Burned: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was suspended from an account (it can be restored later).
         */
        Suspended: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some amount was restored into an account.
         */
        Restored: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * An account was upgraded.
         */
        Upgraded: PlainDescriptor<Anonymize<I4cbvqmqadhrea>>;
        /**
         * Total issuance was increased by `amount`, creating a credit to be balanced.
         */
        Issued: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Total issuance was decreased by `amount`, creating a debt to be balanced.
         */
        Rescinded: PlainDescriptor<Anonymize<I3qt1hgg4djhgb>>;
        /**
         * Some balance was locked.
         */
        Locked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was unlocked.
         */
        Unlocked: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * Some balance was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * The `TotalIssuance` was forcefully changed.
         */
        TotalIssuanceForced: PlainDescriptor<Anonymize<I4fooe9dun9o0t>>;
        /**
         * An unexpected/defensive event was triggered.
         */
        Unexpected: PlainDescriptor<Anonymize<Iph9c4rn81ub2>>;
    };
    TransactionPayment: {
        /**
         * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
         * has been paid by `who`.
         */
        TransactionFeePaid: PlainDescriptor<Anonymize<Ier2cke86dqbr2>>;
    };
    AssetTxPayment: {
        /**
         * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
         * has been paid by `who` in an asset `asset_id`.
         */
        AssetTxFeePaid: PlainDescriptor<Anonymize<Imhre0s2vm68p>>;
        /**
         * A swap of the refund in native currency back to asset failed.
         */
        AssetRefundFailed: PlainDescriptor<Anonymize<Icjchvrijclvlv>>;
    };
    Vesting: {
        /**
         * A vesting schedule has been created.
         */
        VestingCreated: PlainDescriptor<Anonymize<Ih04jp733tqqa>>;
        /**
         * The amount vested has been updated. This could indicate a change in funds available.
         * The balance given is the amount which is left unvested (and thus locked).
         */
        VestingUpdated: PlainDescriptor<Anonymize<Ievr89968437gm>>;
        /**
         * An \[account\] has become fully vested.
         */
        VestingCompleted: PlainDescriptor<Anonymize<Icbccs0ug47ilf>>;
    };
    Claims: {
        /**
         * Someone claimed some DOTs.
         */
        Claimed: PlainDescriptor<Anonymize<Ie3hcrrq6r18fs>>;
    };
    CollatorSelection: {
        /**
         * New Invulnerables were set.
         */
        NewInvulnerables: PlainDescriptor<Anonymize<I39t01nnod9109>>;
        /**
         * A new Invulnerable was added.
         */
        InvulnerableAdded: PlainDescriptor<Anonymize<I6v8sm60vvkmk7>>;
        /**
         * An Invulnerable was removed.
         */
        InvulnerableRemoved: PlainDescriptor<Anonymize<I6v8sm60vvkmk7>>;
        /**
         * The number of desired candidates was set.
         */
        NewDesiredCandidates: PlainDescriptor<Anonymize<I1qmtmbe5so8r3>>;
        /**
         * The candidacy bond was set.
         */
        NewCandidacyBond: PlainDescriptor<Anonymize<Ih99m6ehpcar7>>;
        /**
         * A new candidate joined.
         */
        CandidateAdded: PlainDescriptor<Anonymize<Idgorhsbgdq2ap>>;
        /**
         * Bond of a candidate updated.
         */
        CandidateBondUpdated: PlainDescriptor<Anonymize<Idgorhsbgdq2ap>>;
        /**
         * A candidate was removed.
         */
        CandidateRemoved: PlainDescriptor<Anonymize<I6v8sm60vvkmk7>>;
        /**
         * An account was replaced in the candidate list by another one.
         */
        CandidateReplaced: PlainDescriptor<Anonymize<I9ubb2kqevnu6t>>;
        /**
         * An account was unable to be added to the Invulnerables because they did not have keys
         * registered. Other Invulnerables may have been set.
         */
        InvalidInvulnerableSkipped: PlainDescriptor<Anonymize<I6v8sm60vvkmk7>>;
    };
    Session: {
        /**
         * New session has happened. Note that the argument is the session index, not the
         * block number as the type might suggest.
         */
        NewSession: PlainDescriptor<Anonymize<I2hq50pu2kdjpo>>;
        /**
         * The `NewSession` event in the current block also implies a new validator set to be
         * queued.
         */
        NewQueued: PlainDescriptor<undefined>;
        /**
         * Validator has been disabled.
         */
        ValidatorDisabled: PlainDescriptor<Anonymize<I9acqruh7322g2>>;
        /**
         * Validator has been re-enabled.
         */
        ValidatorReenabled: PlainDescriptor<Anonymize<I9acqruh7322g2>>;
    };
    XcmpQueue: {
        /**
         * An HRMP message was sent to a sibling parachain.
         */
        XcmpMessageSent: PlainDescriptor<Anonymize<I137t1cld92pod>>;
    };
    PolkadotXcm: {
        /**
         * Execution of an XCM message was attempted.
         */
        Attempted: PlainDescriptor<Anonymize<I61d51nv4cou88>>;
        /**
         * An XCM message was sent.
         */
        Sent: PlainDescriptor<Anonymize<If8u5kl4h8070m>>;
        /**
         * An XCM message failed to send.
         */
        SendFailed: PlainDescriptor<Anonymize<Ibmuil6p3vl83l>>;
        /**
         * An XCM message failed to process.
         */
        ProcessXcmError: PlainDescriptor<Anonymize<I7lul91g50ae87>>;
        /**
         * Query response received which does not match a registered query. This may be because a
         * matching query was never registered, it may be because it is a duplicate response, or
         * because the query timed out.
         */
        UnexpectedResponse: PlainDescriptor<Anonymize<Icl7nl1rfeog3i>>;
        /**
         * Query response has been received and is ready for taking with `take_response`. There is
         * no registered notification call.
         */
        ResponseReady: PlainDescriptor<Anonymize<Iasr6pj6shs0fl>>;
        /**
         * Query response has been received and query is removed. The registered notification has
         * been dispatched and executed successfully.
         */
        Notified: PlainDescriptor<Anonymize<I2uqmls7kcdnii>>;
        /**
         * Query response has been received and query is removed. The registered notification
         * could not be dispatched because the dispatch weight is greater than the maximum weight
         * originally budgeted by this runtime for the query result.
         */
        NotifyOverweight: PlainDescriptor<Anonymize<Idg69klialbkb8>>;
        /**
         * Query response has been received and query is removed. There was a general error with
         * dispatching the notification call.
         */
        NotifyDispatchError: PlainDescriptor<Anonymize<I2uqmls7kcdnii>>;
        /**
         * Query response has been received and query is removed. The dispatch was unable to be
         * decoded into a `Call`; this might be due to dispatch function having a signature which
         * is not `(origin, QueryId, Response)`.
         */
        NotifyDecodeFailed: PlainDescriptor<Anonymize<I2uqmls7kcdnii>>;
        /**
         * Expected query response has been received but the origin location of the response does
         * not match that expected. The query remains registered for a later, valid, response to
         * be received and acted upon.
         */
        InvalidResponder: PlainDescriptor<Anonymize<I7r6b7145022pp>>;
        /**
         * Expected query response has been received but the expected origin location placed in
         * storage by this runtime previously cannot be decoded. The query remains registered.
         *
         * This is unexpected (since a location placed in storage in a previously executing
         * runtime should be readable prior to query timeout) and dangerous since the possibly
         * valid response will be dropped. Manual governance intervention is probably going to be
         * needed.
         */
        InvalidResponderVersion: PlainDescriptor<Anonymize<Icl7nl1rfeog3i>>;
        /**
         * Received query response has been read and removed.
         */
        ResponseTaken: PlainDescriptor<Anonymize<I30pg328m00nr3>>;
        /**
         * Some assets have been placed in an asset trap.
         */
        AssetsTrapped: PlainDescriptor<Anonymize<Icmrn7bogp28cs>>;
        /**
         * An XCM version change notification message has been attempted to be sent.
         *
         * The cost of sending it (borne by the chain) is included.
         */
        VersionChangeNotified: PlainDescriptor<Anonymize<I7m9b5plj4h5ot>>;
        /**
         * The supported version of a location has been changed. This might be through an
         * automatic notification or a manual intervention.
         */
        SupportedVersionChanged: PlainDescriptor<Anonymize<I9kt8c221c83ln>>;
        /**
         * A given location which had a version change subscription was dropped owing to an error
         * sending the notification to it.
         */
        NotifyTargetSendFail: PlainDescriptor<Anonymize<I9onhk772nfs4f>>;
        /**
         * A given location which had a version change subscription was dropped owing to an error
         * migrating the location to our new XCM format.
         */
        NotifyTargetMigrationFail: PlainDescriptor<Anonymize<I3l6bnksrmt56r>>;
        /**
         * Expected query response has been received but the expected querier location placed in
         * storage by this runtime previously cannot be decoded. The query remains registered.
         *
         * This is unexpected (since a location placed in storage in a previously executing
         * runtime should be readable prior to query timeout) and dangerous since the possibly
         * valid response will be dropped. Manual governance intervention is probably going to be
         * needed.
         */
        InvalidQuerierVersion: PlainDescriptor<Anonymize<Icl7nl1rfeog3i>>;
        /**
         * Expected query response has been received but the querier location of the response does
         * not match the expected. The query remains registered for a later, valid, response to
         * be received and acted upon.
         */
        InvalidQuerier: PlainDescriptor<Anonymize<Idh09k0l2pmdcg>>;
        /**
         * A remote has requested XCM version change notification from us and we have honored it.
         * A version information message is sent to them and its cost is included.
         */
        VersionNotifyStarted: PlainDescriptor<Anonymize<I7uoiphbm0tj4r>>;
        /**
         * We have requested that a remote chain send us XCM version change notifications.
         */
        VersionNotifyRequested: PlainDescriptor<Anonymize<I7uoiphbm0tj4r>>;
        /**
         * We have requested that a remote chain stops sending us XCM version change
         * notifications.
         */
        VersionNotifyUnrequested: PlainDescriptor<Anonymize<I7uoiphbm0tj4r>>;
        /**
         * Fees were paid from a location for an operation (often for using `SendXcm`).
         */
        FeesPaid: PlainDescriptor<Anonymize<I512p1n7qt24l8>>;
        /**
         * Some assets have been claimed from an asset trap
         */
        AssetsClaimed: PlainDescriptor<Anonymize<Icmrn7bogp28cs>>;
        /**
         * A XCM version migration finished.
         */
        VersionMigrationFinished: PlainDescriptor<Anonymize<I6s1nbislhk619>>;
        /**
         * An `aliaser` location was authorized by `target` to alias it, authorization valid until
         * `expiry` block number.
         */
        AliasAuthorized: PlainDescriptor<Anonymize<I3gghqnh2mj0is>>;
        /**
         * `target` removed alias authorization for `aliaser`.
         */
        AliasAuthorizationRemoved: PlainDescriptor<Anonymize<I6iv852roh6t3h>>;
        /**
         * `target` removed all alias authorizations.
         */
        AliasesAuthorizationsRemoved: PlainDescriptor<Anonymize<I9oc2o6itbiopq>>;
    };
    CumulusXcm: {
        /**
         * Downward message is invalid XCM.
         * \[ id \]
         */
        InvalidFormat: PlainDescriptor<FixedSizeBinary<32>>;
        /**
         * Downward message is unsupported version of XCM.
         * \[ id \]
         */
        UnsupportedVersion: PlainDescriptor<FixedSizeBinary<32>>;
        /**
         * Downward message executed with the given outcome.
         * \[ id, outcome \]
         */
        ExecutedDownward: PlainDescriptor<Anonymize<Ibslgga81p36aa>>;
    };
    ToKusamaXcmRouter: {
        /**
         * Delivery fee factor has been decreased.
         */
        DeliveryFeeFactorDecreased: PlainDescriptor<Anonymize<Ie8hpsm3jhsvo3>>;
        /**
         * Delivery fee factor has been increased.
         */
        DeliveryFeeFactorIncreased: PlainDescriptor<Anonymize<Ie8hpsm3jhsvo3>>;
    };
    MessageQueue: {
        /**
         * Message discarded due to an error in the `MessageProcessor` (usually a format error).
         */
        ProcessingFailed: PlainDescriptor<Anonymize<I1rvj4ubaplho0>>;
        /**
         * Message is processed.
         */
        Processed: PlainDescriptor<Anonymize<Ia3uu7lqcc1q1i>>;
        /**
         * Message placed in overweight queue.
         */
        OverweightEnqueued: PlainDescriptor<Anonymize<I7crucfnonitkn>>;
        /**
         * This page was reaped.
         */
        PageReaped: PlainDescriptor<Anonymize<I7tmrp94r9sq4n>>;
    };
    SnowbridgeSystemFrontend: {
        /**
         * An XCM was sent
         */
        MessageSent: PlainDescriptor<Anonymize<If8u5kl4h8070m>>;
        /**
         * Set OperatingMode
         */
        ExportOperatingModeChanged: PlainDescriptor<Anonymize<I9i6b1362umn1t>>;
    };
    Utility: {
        /**
         * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
         * well as the error.
         */
        BatchInterrupted: PlainDescriptor<Anonymize<Idh1o9u76dvv56>>;
        /**
         * Batch of dispatches completed fully with no error.
         */
        BatchCompleted: PlainDescriptor<undefined>;
        /**
         * Batch of dispatches completed but has errors.
         */
        BatchCompletedWithErrors: PlainDescriptor<undefined>;
        /**
         * A single item within a Batch of dispatches has completed with no error.
         */
        ItemCompleted: PlainDescriptor<undefined>;
        /**
         * A single item within a Batch of dispatches has completed with error.
         */
        ItemFailed: PlainDescriptor<Anonymize<Iekcc69070n105>>;
        /**
         * A call was dispatched.
         */
        DispatchedAs: PlainDescriptor<Anonymize<I55u9magsq616l>>;
        /**
         * Main call was dispatched.
         */
        IfElseMainSuccess: PlainDescriptor<undefined>;
        /**
         * The fallback call was dispatched.
         */
        IfElseFallbackCalled: PlainDescriptor<Anonymize<Ieok3k088heoj6>>;
    };
    Multisig: {
        /**
         * A new multisig operation has begun.
         */
        NewMultisig: PlainDescriptor<Anonymize<Iep27ialq4a7o7>>;
        /**
         * A multisig operation has been approved by someone.
         */
        MultisigApproval: PlainDescriptor<Anonymize<Iasu5jvoqr43mv>>;
        /**
         * A multisig operation has been executed.
         */
        MultisigExecuted: PlainDescriptor<Anonymize<I3t82p779p3mq1>>;
        /**
         * A multisig operation has been cancelled.
         */
        MultisigCancelled: PlainDescriptor<Anonymize<I5qolde99acmd1>>;
        /**
         * The deposit for a multisig operation has been updated/poked.
         */
        DepositPoked: PlainDescriptor<Anonymize<I8gtde5abn1g9a>>;
    };
    Proxy: {
        /**
         * A proxy was executed correctly, with the given.
         */
        ProxyExecuted: PlainDescriptor<Anonymize<I55u9magsq616l>>;
        /**
         * A pure account has been created by new proxy with given
         * disambiguation index and proxy type.
         */
        PureCreated: PlainDescriptor<Anonymize<Ie30u0oafsgjvf>>;
        /**
         * A pure proxy was killed by its spawner.
         */
        PureKilled: PlainDescriptor<Anonymize<I3c89s6g2o36ch>>;
        /**
         * An announcement was placed to make a call in the future.
         */
        Announced: PlainDescriptor<Anonymize<I2ur0oeqg495j8>>;
        /**
         * A proxy was added.
         */
        ProxyAdded: PlainDescriptor<Anonymize<I602733ahhj29u>>;
        /**
         * A proxy was removed.
         */
        ProxyRemoved: PlainDescriptor<Anonymize<I602733ahhj29u>>;
        /**
         * A deposit stored for proxies or announcements was poked / updated.
         */
        DepositPoked: PlainDescriptor<Anonymize<I1bhd210c3phjj>>;
    };
    Indices: {
        /**
         * A account index was assigned.
         */
        IndexAssigned: PlainDescriptor<Anonymize<Ia1u3jll6a06ae>>;
        /**
         * A account index has been freed up (unassigned).
         */
        IndexFreed: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A account index has been frozen to its current account ID.
         */
        IndexFrozen: PlainDescriptor<Anonymize<Ia1u3jll6a06ae>>;
        /**
         * A deposit to reserve an index has been poked/reconsidered.
         */
        DepositPoked: PlainDescriptor<Anonymize<Ic9g5lvl9iddc5>>;
    };
    Assets: {
        /**
         * Some asset class was created.
         */
        Created: PlainDescriptor<Anonymize<I88ff3u4dpivk>>;
        /**
         * Some assets were issued.
         */
        Issued: PlainDescriptor<Anonymize<I33cp947glv1ks>>;
        /**
         * Some assets were transferred.
         */
        Transferred: PlainDescriptor<Anonymize<Ic9om1gmmqu7rq>>;
        /**
         * Some assets were destroyed.
         */
        Burned: PlainDescriptor<Anonymize<I5hfov2b68ppb6>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ibthhb2m9vneds>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>;
        /**
         * Some account `who` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some account `who` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some asset `asset_id` was frozen.
         */
        AssetFrozen: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Some asset `asset_id` was thawed.
         */
        AssetThawed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Accounts were destroyed for given asset.
         */
        AccountsDestroyed: PlainDescriptor<Anonymize<Ieduc1e6frq8rb>>;
        /**
         * Approvals were destroyed for given asset.
         */
        ApprovalsDestroyed: PlainDescriptor<Anonymize<I9h6gbtabovtm4>>;
        /**
         * An asset class is in the process of being destroyed.
         */
        DestructionStarted: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * An asset class was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Some asset class was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>;
        /**
         * New metadata has been set for an asset.
         */
        MetadataSet: PlainDescriptor<Anonymize<Ifnsa0dkkpf465>>;
        /**
         * Metadata has been cleared for an asset.
         */
        MetadataCleared: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * (Additional) funds have been approved for transfer to a destination account.
         */
        ApprovedTransfer: PlainDescriptor<Anonymize<I65dtqr2egjbc3>>;
        /**
         * An approval for account `delegate` was cancelled by `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<Ibqj3vg5s5lk0c>>;
        /**
         * An `amount` was transferred in its entirety from `owner` to `destination` by
         * the approved `delegate`.
         */
        TransferredApproved: PlainDescriptor<Anonymize<I6l73u513p8rna>>;
        /**
         * An asset has had its attributes changed by the `Force` origin.
         */
        AssetStatusChanged: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * The min_balance of an asset has been updated by the asset owner.
         */
        AssetMinBalanceChanged: PlainDescriptor<Anonymize<Iefqmt2htu1dlu>>;
        /**
         * Some account `who` was created with a deposit from `depositor`.
         */
        Touched: PlainDescriptor<Anonymize<If8bgtgqrchjtu>>;
        /**
         * Some account `who` was blocked.
         */
        Blocked: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some assets were deposited (e.g. for transaction fees).
         */
        Deposited: PlainDescriptor<Anonymize<Idusmq77988cmt>>;
        /**
         * Some assets were withdrawn from the account (e.g. for transaction fees).
         */
        Withdrawn: PlainDescriptor<Anonymize<Idusmq77988cmt>>;
    };
    Uniques: {
        /**
         * A `collection` was created.
         */
        Created: PlainDescriptor<Anonymize<I9gqanbbbe917p>>;
        /**
         * A `collection` was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Id1m1230297f7a>>;
        /**
         * A `collection` was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * An `item` was issued.
         */
        Issued: PlainDescriptor<Anonymize<Ifvb1p5munhhv4>>;
        /**
         * An `item` was transferred.
         */
        Transferred: PlainDescriptor<Anonymize<I46h83ilqeed3g>>;
        /**
         * An `item` was destroyed.
         */
        Burned: PlainDescriptor<Anonymize<Ifvb1p5munhhv4>>;
        /**
         * Some `item` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Some `item` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Some `collection` was frozen.
         */
        CollectionFrozen: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * Some `collection` was thawed.
         */
        CollectionThawed: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Icahse3uoi76n7>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<I75sj3uv7gnemk>>;
        /**
         * An `item` of a `collection` has been approved by the `owner` for transfer by
         * a `delegate`.
         */
        ApprovedTransfer: PlainDescriptor<Anonymize<I5fjkvcb5vr6nb>>;
        /**
         * An approval for a `delegate` account to transfer the `item` of an item
         * `collection` was cancelled by its `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<I5fjkvcb5vr6nb>>;
        /**
         * A `collection` has had its attributes changed by the `Force` origin.
         */
        ItemStatusChanged: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * New metadata has been set for a `collection`.
         */
        CollectionMetadataSet: PlainDescriptor<Anonymize<I9viqhmdtuof5e>>;
        /**
         * Metadata has been cleared for a `collection`.
         */
        CollectionMetadataCleared: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * New metadata has been set for an item.
         */
        MetadataSet: PlainDescriptor<Anonymize<Iceq9fmmp9aeqv>>;
        /**
         * Metadata has been cleared for an item.
         */
        MetadataCleared: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * Metadata has been cleared for an item.
         */
        Redeposited: PlainDescriptor<Anonymize<I2gr1toekv86b9>>;
        /**
         * New attribute metadata has been set for a `collection` or `item`.
         */
        AttributeSet: PlainDescriptor<Anonymize<I5tvvgui05tn6e>>;
        /**
         * Attribute metadata has been cleared for a `collection` or `item`.
         */
        AttributeCleared: PlainDescriptor<Anonymize<Ibal0joadvdc2h>>;
        /**
         * Ownership acceptance has changed for an account.
         */
        OwnershipAcceptanceChanged: PlainDescriptor<Anonymize<I2v2ikqt2trp52>>;
        /**
         * Max supply has been set for a collection.
         */
        CollectionMaxSupplySet: PlainDescriptor<Anonymize<I6h88h8vba22v8>>;
        /**
         * The price was set for the instance.
         */
        ItemPriceSet: PlainDescriptor<Anonymize<If3057hi1g5qlo>>;
        /**
         * The price for the instance was removed.
         */
        ItemPriceRemoved: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * An item was bought.
         */
        ItemBought: PlainDescriptor<Anonymize<Iaii5qf41d5n3d>>;
    };
    Nfts: {
        /**
         * A `collection` was created.
         */
        Created: PlainDescriptor<Anonymize<I9gqanbbbe917p>>;
        /**
         * A `collection` was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Id1m1230297f7a>>;
        /**
         * A `collection` was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * An `item` was issued.
         */
        Issued: PlainDescriptor<Anonymize<Ifvb1p5munhhv4>>;
        /**
         * An `item` was transferred.
         */
        Transferred: PlainDescriptor<Anonymize<I46h83ilqeed3g>>;
        /**
         * An `item` was destroyed.
         */
        Burned: PlainDescriptor<Anonymize<Ifvb1p5munhhv4>>;
        /**
         * An `item` became non-transferable.
         */
        ItemTransferLocked: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * An `item` became transferable.
         */
        ItemTransferUnlocked: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * `item` metadata or attributes were locked.
         */
        ItemPropertiesLocked: PlainDescriptor<Anonymize<I1jj31tn29ie3c>>;
        /**
         * Some `collection` was locked.
         */
        CollectionLocked: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Icahse3uoi76n7>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ico8bnjc6taa27>>;
        /**
         * An `item` of a `collection` has been approved by the `owner` for transfer by
         * a `delegate`.
         */
        TransferApproved: PlainDescriptor<Anonymize<I78i1bvlonei69>>;
        /**
         * An approval for a `delegate` account to transfer the `item` of an item
         * `collection` was cancelled by its `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<I5fjkvcb5vr6nb>>;
        /**
         * All approvals of an item got cancelled.
         */
        AllApprovalsCancelled: PlainDescriptor<Anonymize<Ifvb1p5munhhv4>>;
        /**
         * A `collection` has had its config changed by the `Force` origin.
         */
        CollectionConfigChanged: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * New metadata has been set for a `collection`.
         */
        CollectionMetadataSet: PlainDescriptor<Anonymize<I78u60nqh0etah>>;
        /**
         * Metadata has been cleared for a `collection`.
         */
        CollectionMetadataCleared: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * New metadata has been set for an item.
         */
        ItemMetadataSet: PlainDescriptor<Anonymize<Icrkms46uh8tpb>>;
        /**
         * Metadata has been cleared for an item.
         */
        ItemMetadataCleared: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * The deposit for a set of `item`s within a `collection` has been updated.
         */
        Redeposited: PlainDescriptor<Anonymize<I2gr1toekv86b9>>;
        /**
         * New attribute metadata has been set for a `collection` or `item`.
         */
        AttributeSet: PlainDescriptor<Anonymize<I5llu6o6a0go5i>>;
        /**
         * Attribute metadata has been cleared for a `collection` or `item`.
         */
        AttributeCleared: PlainDescriptor<Anonymize<I93r2effh7od84>>;
        /**
         * A new approval to modify item attributes was added.
         */
        ItemAttributesApprovalAdded: PlainDescriptor<Anonymize<I9i1f9mrso1hmf>>;
        /**
         * A new approval to modify item attributes was removed.
         */
        ItemAttributesApprovalRemoved: PlainDescriptor<Anonymize<I9i1f9mrso1hmf>>;
        /**
         * Ownership acceptance has changed for an account.
         */
        OwnershipAcceptanceChanged: PlainDescriptor<Anonymize<I2v2ikqt2trp52>>;
        /**
         * Max supply has been set for a collection.
         */
        CollectionMaxSupplySet: PlainDescriptor<Anonymize<I6h88h8vba22v8>>;
        /**
         * Mint settings for a collection had changed.
         */
        CollectionMintSettingsUpdated: PlainDescriptor<Anonymize<I6cu7obfo0rr0o>>;
        /**
         * Event gets emitted when the `NextCollectionId` gets incremented.
         */
        NextCollectionIdIncremented: PlainDescriptor<Anonymize<I9ksla2si91s56>>;
        /**
         * The price was set for the item.
         */
        ItemPriceSet: PlainDescriptor<Anonymize<If3057hi1g5qlo>>;
        /**
         * The price for the item was removed.
         */
        ItemPriceRemoved: PlainDescriptor<Anonymize<Iafkqus0ohh6l6>>;
        /**
         * An item was bought.
         */
        ItemBought: PlainDescriptor<Anonymize<Iaii5qf41d5n3d>>;
        /**
         * A tip was sent.
         */
        TipSent: PlainDescriptor<Anonymize<Id9j7b85otvjru>>;
        /**
         * An `item` swap intent was created.
         */
        SwapCreated: PlainDescriptor<Anonymize<Iaihk9pek2ajl9>>;
        /**
         * The swap was cancelled.
         */
        SwapCancelled: PlainDescriptor<Anonymize<Iaihk9pek2ajl9>>;
        /**
         * The swap has been claimed.
         */
        SwapClaimed: PlainDescriptor<Anonymize<Id9av23h47ufb2>>;
        /**
         * New attributes have been set for an `item` of the `collection`.
         */
        PreSignedAttributesSet: PlainDescriptor<Anonymize<Ib4kpnijas4jqp>>;
        /**
         * A new attribute in the `Pallet` namespace was set for the `collection` or an `item`
         * within that `collection`.
         */
        PalletAttributeSet: PlainDescriptor<Anonymize<I2vnu5k0u1i65h>>;
    };
    ForeignAssets: {
        /**
         * Some asset class was created.
         */
        Created: PlainDescriptor<Anonymize<Icqe266pmnr25o>>;
        /**
         * Some assets were issued.
         */
        Issued: PlainDescriptor<Anonymize<I5hoiph0lqphp>>;
        /**
         * Some assets were transferred.
         */
        Transferred: PlainDescriptor<Anonymize<I5k7oropl9ofc7>>;
        /**
         * Some assets were destroyed.
         */
        Burned: PlainDescriptor<Anonymize<I48vagp1omigob>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ib5tst4ppem1g6>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Ibn64edsrg3737>>;
        /**
         * Some account `who` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<I83r9d02dh47j9>>;
        /**
         * Some account `who` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<I83r9d02dh47j9>>;
        /**
         * Some asset `asset_id` was frozen.
         */
        AssetFrozen: PlainDescriptor<Anonymize<I22bm4d7re21j9>>;
        /**
         * Some asset `asset_id` was thawed.
         */
        AssetThawed: PlainDescriptor<Anonymize<I22bm4d7re21j9>>;
        /**
         * Accounts were destroyed for given asset.
         */
        AccountsDestroyed: PlainDescriptor<Anonymize<I3jnhifvaeuama>>;
        /**
         * Approvals were destroyed for given asset.
         */
        ApprovalsDestroyed: PlainDescriptor<Anonymize<I8n1gia0lo42ok>>;
        /**
         * An asset class is in the process of being destroyed.
         */
        DestructionStarted: PlainDescriptor<Anonymize<I22bm4d7re21j9>>;
        /**
         * An asset class was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<I22bm4d7re21j9>>;
        /**
         * Some asset class was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Ibn64edsrg3737>>;
        /**
         * New metadata has been set for an asset.
         */
        MetadataSet: PlainDescriptor<Anonymize<I6gb0o7lqjfdjq>>;
        /**
         * Metadata has been cleared for an asset.
         */
        MetadataCleared: PlainDescriptor<Anonymize<I22bm4d7re21j9>>;
        /**
         * (Additional) funds have been approved for transfer to a destination account.
         */
        ApprovedTransfer: PlainDescriptor<Anonymize<Idh36v6iegkmpq>>;
        /**
         * An approval for account `delegate` was cancelled by `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<I27hnueutmchbe>>;
        /**
         * An `amount` was transferred in its entirety from `owner` to `destination` by
         * the approved `delegate`.
         */
        TransferredApproved: PlainDescriptor<Anonymize<Iectm2em66uhao>>;
        /**
         * An asset has had its attributes changed by the `Force` origin.
         */
        AssetStatusChanged: PlainDescriptor<Anonymize<I22bm4d7re21j9>>;
        /**
         * The min_balance of an asset has been updated by the asset owner.
         */
        AssetMinBalanceChanged: PlainDescriptor<Anonymize<I7q57goff3j72h>>;
        /**
         * Some account `who` was created with a deposit from `depositor`.
         */
        Touched: PlainDescriptor<Anonymize<Ibe49veu9i9nro>>;
        /**
         * Some account `who` was blocked.
         */
        Blocked: PlainDescriptor<Anonymize<I83r9d02dh47j9>>;
        /**
         * Some assets were deposited (e.g. for transaction fees).
         */
        Deposited: PlainDescriptor<Anonymize<I1rnkmiu7usb82>>;
        /**
         * Some assets were withdrawn from the account (e.g. for transaction fees).
         */
        Withdrawn: PlainDescriptor<Anonymize<I1rnkmiu7usb82>>;
    };
    PoolAssets: {
        /**
         * Some asset class was created.
         */
        Created: PlainDescriptor<Anonymize<I88ff3u4dpivk>>;
        /**
         * Some assets were issued.
         */
        Issued: PlainDescriptor<Anonymize<I33cp947glv1ks>>;
        /**
         * Some assets were transferred.
         */
        Transferred: PlainDescriptor<Anonymize<Ic9om1gmmqu7rq>>;
        /**
         * Some assets were destroyed.
         */
        Burned: PlainDescriptor<Anonymize<I5hfov2b68ppb6>>;
        /**
         * The management team changed.
         */
        TeamChanged: PlainDescriptor<Anonymize<Ibthhb2m9vneds>>;
        /**
         * The owner changed.
         */
        OwnerChanged: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>;
        /**
         * Some account `who` was frozen.
         */
        Frozen: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some account `who` was thawed.
         */
        Thawed: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some asset `asset_id` was frozen.
         */
        AssetFrozen: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Some asset `asset_id` was thawed.
         */
        AssetThawed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Accounts were destroyed for given asset.
         */
        AccountsDestroyed: PlainDescriptor<Anonymize<Ieduc1e6frq8rb>>;
        /**
         * Approvals were destroyed for given asset.
         */
        ApprovalsDestroyed: PlainDescriptor<Anonymize<I9h6gbtabovtm4>>;
        /**
         * An asset class is in the process of being destroyed.
         */
        DestructionStarted: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * An asset class was destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * Some asset class was force-created.
         */
        ForceCreated: PlainDescriptor<Anonymize<Iaitn5bqfacj7k>>;
        /**
         * New metadata has been set for an asset.
         */
        MetadataSet: PlainDescriptor<Anonymize<Ifnsa0dkkpf465>>;
        /**
         * Metadata has been cleared for an asset.
         */
        MetadataCleared: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * (Additional) funds have been approved for transfer to a destination account.
         */
        ApprovedTransfer: PlainDescriptor<Anonymize<I65dtqr2egjbc3>>;
        /**
         * An approval for account `delegate` was cancelled by `owner`.
         */
        ApprovalCancelled: PlainDescriptor<Anonymize<Ibqj3vg5s5lk0c>>;
        /**
         * An `amount` was transferred in its entirety from `owner` to `destination` by
         * the approved `delegate`.
         */
        TransferredApproved: PlainDescriptor<Anonymize<I6l73u513p8rna>>;
        /**
         * An asset has had its attributes changed by the `Force` origin.
         */
        AssetStatusChanged: PlainDescriptor<Anonymize<Ia5le7udkgbaq9>>;
        /**
         * The min_balance of an asset has been updated by the asset owner.
         */
        AssetMinBalanceChanged: PlainDescriptor<Anonymize<Iefqmt2htu1dlu>>;
        /**
         * Some account `who` was created with a deposit from `depositor`.
         */
        Touched: PlainDescriptor<Anonymize<If8bgtgqrchjtu>>;
        /**
         * Some account `who` was blocked.
         */
        Blocked: PlainDescriptor<Anonymize<If4ebvclj2ugvi>>;
        /**
         * Some assets were deposited (e.g. for transaction fees).
         */
        Deposited: PlainDescriptor<Anonymize<Idusmq77988cmt>>;
        /**
         * Some assets were withdrawn from the account (e.g. for transaction fees).
         */
        Withdrawn: PlainDescriptor<Anonymize<Idusmq77988cmt>>;
    };
    AssetConversion: {
        /**
         * A successful call of the `CreatePool` extrinsic will create this event.
         */
        PoolCreated: PlainDescriptor<Anonymize<I1q546n7mmm8nk>>;
        /**
         * A successful call of the `AddLiquidity` extrinsic will create this event.
         */
        LiquidityAdded: PlainDescriptor<Anonymize<If7i5aoh4lk0a1>>;
        /**
         * A successful call of the `RemoveLiquidity` extrinsic will create this event.
         */
        LiquidityRemoved: PlainDescriptor<Anonymize<If9prqbk25189q>>;
        /**
         * Assets have been converted from one to another. Both `SwapExactTokenForToken`
         * and `SwapTokenForExactToken` will generate this event.
         */
        SwapExecuted: PlainDescriptor<Anonymize<Icugn66dlnp8rd>>;
        /**
         * Assets have been converted from one to another.
         */
        SwapCreditExecuted: PlainDescriptor<Anonymize<I1bfrt15apsnp>>;
        /**
         * Pool has been touched in order to fulfill operational requirements.
         */
        Touched: PlainDescriptor<Anonymize<Id3old33tr9erj>>;
    };
    Treasury: {
        /**
         * We have ended a spend period and will now allocate funds.
         */
        Spending: PlainDescriptor<Anonymize<I8iksqi3eani0a>>;
        /**
         * Some funds have been allocated.
         */
        Awarded: PlainDescriptor<Anonymize<I16enopmju1p0q>>;
        /**
         * Some of our funds have been burnt.
         */
        Burnt: PlainDescriptor<Anonymize<I43kq8qudg7pq9>>;
        /**
         * Spending has finished; this is the amount that rolls over until next spend.
         */
        Rollover: PlainDescriptor<Anonymize<I76riseemre533>>;
        /**
         * Some funds have been deposited.
         */
        Deposit: PlainDescriptor<Anonymize<Ie5v6njpckr05b>>;
        /**
         * A new spend proposal has been approved.
         */
        SpendApproved: PlainDescriptor<Anonymize<I38bmcrmh852rk>>;
        /**
         * The inactive funds of the pallet have been updated.
         */
        UpdatedInactive: PlainDescriptor<Anonymize<I4hcillge8de5f>>;
        /**
         * A new asset spend proposal has been approved.
         */
        AssetSpendApproved: PlainDescriptor<Anonymize<I6pl54js63fnua>>;
        /**
         * An approved spend was voided.
         */
        AssetSpendVoided: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A payment happened.
         */
        Paid: PlainDescriptor<Anonymize<Iek7v4hrgnq6iv>>;
        /**
         * A payment failed and can be retried.
         */
        PaymentFailed: PlainDescriptor<Anonymize<Iek7v4hrgnq6iv>>;
        /**
         * A spend was processed and removed from the storage. It might have been successfully
         * paid or it may have expired.
         */
        SpendProcessed: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
    };
    ConvictionVoting: {
        /**
         * An account has delegated their vote to another account. \[who, target\]
         */
        Delegated: PlainDescriptor<Anonymize<I2na29tt2afp0j>>;
        /**
         * An \[account\] has cancelled a previous delegation operation.
         */
        Undelegated: PlainDescriptor<SS58String>;
        /**
         * An account has voted
         */
        Voted: PlainDescriptor<Anonymize<I9qfchhljqsjjl>>;
        /**
         * A vote has been removed
         */
        VoteRemoved: PlainDescriptor<Anonymize<I9qfchhljqsjjl>>;
        /**
         * The lockup period of a conviction vote expired, and the funds have been unlocked.
         */
        VoteUnlocked: PlainDescriptor<Anonymize<I7kij8p9kchdjo>>;
    };
    Referenda: {
        /**
         * A referendum has been submitted.
         */
        Submitted: PlainDescriptor<Anonymize<I229ijht536qdu>>;
        /**
         * The decision deposit has been placed.
         */
        DecisionDepositPlaced: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * The decision deposit has been refunded.
         */
        DecisionDepositRefunded: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * A deposit has been slashed.
         */
        DepositSlashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * A referendum has moved into the deciding phase.
         */
        DecisionStarted: PlainDescriptor<Anonymize<I9cg2delv92pvq>>;
        /**
        
         */
        ConfirmStarted: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
        
         */
        ConfirmAborted: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A referendum has ended its confirmation phase and is ready for approval.
         */
        Confirmed: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been approved and its proposal has been scheduled.
         */
        Approved: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A proposal has been rejected by referendum.
         */
        Rejected: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been timed out without being decided.
         */
        TimedOut: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been cancelled.
         */
        Cancelled: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * A referendum has been killed.
         */
        Killed: PlainDescriptor<Anonymize<Ilhp45uime5tp>>;
        /**
         * The submission deposit has been refunded.
         */
        SubmissionDepositRefunded: PlainDescriptor<Anonymize<I62nte77gksm0f>>;
        /**
         * Metadata for a referendum has been set.
         */
        MetadataSet: PlainDescriptor<Anonymize<I4f1hv034jf1dt>>;
        /**
         * Metadata for a referendum has been cleared.
         */
        MetadataCleared: PlainDescriptor<Anonymize<I4f1hv034jf1dt>>;
    };
    Whitelist: {
        /**
        
         */
        CallWhitelisted: PlainDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        WhitelistedCallRemoved: PlainDescriptor<Anonymize<I1adbcfi5uc62r>>;
        /**
        
         */
        WhitelistedCallDispatched: PlainDescriptor<Anonymize<Ic21q4q8m0uiak>>;
    };
    Bounties: {
        /**
         * New bounty proposal.
         */
        BountyProposed: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A bounty proposal was rejected; funds were slashed.
         */
        BountyRejected: PlainDescriptor<Anonymize<Id9idaj83175f9>>;
        /**
         * A bounty proposal is funded and became active.
         */
        BountyBecameActive: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A bounty is awarded to a beneficiary.
         */
        BountyAwarded: PlainDescriptor<Anonymize<Ie1semicfuv5uu>>;
        /**
         * A bounty is claimed by beneficiary.
         */
        BountyClaimed: PlainDescriptor<Anonymize<If25fjs9o37co1>>;
        /**
         * A bounty is cancelled.
         */
        BountyCanceled: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A bounty expiry is extended.
         */
        BountyExtended: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A bounty is approved.
         */
        BountyApproved: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
        /**
         * A bounty curator is proposed.
         */
        CuratorProposed: PlainDescriptor<Anonymize<I70sc1pdo8vtos>>;
        /**
         * A bounty curator is unassigned.
         */
        CuratorUnassigned: PlainDescriptor<Anonymize<Ia9p5bg6p18r0i>>;
        /**
         * A bounty curator is accepted.
         */
        CuratorAccepted: PlainDescriptor<Anonymize<I70sc1pdo8vtos>>;
        /**
         * A bounty deposit has been poked.
         */
        DepositPoked: PlainDescriptor<Anonymize<Ibck5e4jpm96l8>>;
    };
    ChildBounties: {
        /**
         * A child-bounty is added.
         */
        Added: PlainDescriptor<Anonymize<I60p8l86a8cm59>>;
        /**
         * A child-bounty is awarded to a beneficiary.
         */
        Awarded: PlainDescriptor<Anonymize<I3m3sk2lgcabvp>>;
        /**
         * A child-bounty is claimed by beneficiary.
         */
        Claimed: PlainDescriptor<Anonymize<I5pf572duh4oeg>>;
        /**
         * A child-bounty is cancelled.
         */
        Canceled: PlainDescriptor<Anonymize<I60p8l86a8cm59>>;
    };
    AssetRate: {
        /**
        
         */
        AssetRateCreated: PlainDescriptor<Anonymize<I9c4d50jrp7as1>>;
        /**
        
         */
        AssetRateRemoved: PlainDescriptor<Anonymize<Ifplevr9hp8jo3>>;
        /**
        
         */
        AssetRateUpdated: PlainDescriptor<Anonymize<Idrugh2blv81ia>>;
    };
    StateTrieMigration: {
        /**
         * Given number of `(top, child)` keys were migrated respectively, with the given
         * `compute`.
         */
        Migrated: PlainDescriptor<Anonymize<Iagqcb06kbevb1>>;
        /**
         * Some account got slashed by the given amount.
         */
        Slashed: PlainDescriptor<Anonymize<Id5fm4p8lj5qgi>>;
        /**
         * The auto migration task finished.
         */
        AutoMigrationFinished: PlainDescriptor<undefined>;
        /**
         * Migration got halted due to an error or miss-configuration.
         */
        Halted: PlainDescriptor<Anonymize<Iec8defeh924b6>>;
    };
    Staking: {
        /**
         * The era payout has been set; the first balance is the validator-payout; the second is
         * the remainder from the maximum amount of reward.
         */
        EraPaid: PlainDescriptor<Anonymize<I1au3fq4n84nv3>>;
        /**
         * The nominator has been rewarded by this amount to this destination.
         */
        Rewarded: PlainDescriptor<Anonymize<Iejaj7m7qka9tr>>;
        /**
         * A staker (validator or nominator) has been slashed by the given amount.
         */
        Slashed: PlainDescriptor<Anonymize<Idnak900lt5lm8>>;
        /**
         * An old slashing report from a prior era was discarded because it could
         * not be processed.
         */
        OldSlashingReportDiscarded: PlainDescriptor<Anonymize<I2hq50pu2kdjpo>>;
        /**
         * An account has bonded this amount. \[stash, amount\]
         *
         * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
         * it will not be emitted for staking rewards when they are added to stake.
         */
        Bonded: PlainDescriptor<Anonymize<Ifk8eme5o7mukf>>;
        /**
         * An account has unbonded this amount.
         */
        Unbonded: PlainDescriptor<Anonymize<Ifk8eme5o7mukf>>;
        /**
         * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
         * from the unlocking queue.
         */
        Withdrawn: PlainDescriptor<Anonymize<Ifk8eme5o7mukf>>;
        /**
         * A subsequent event of `Withdrawn`, indicating that `stash` was fully removed from the
         * system.
         */
        StakerRemoved: PlainDescriptor<Anonymize<Idl3umm12u5pa>>;
        /**
         * A nominator has been kicked from a validator.
         */
        Kicked: PlainDescriptor<Anonymize<Iau4cgm6ih61cf>>;
        /**
         * An account has stopped participating as either a validator or nominator.
         */
        Chilled: PlainDescriptor<Anonymize<Idl3umm12u5pa>>;
        /**
         * A Page of stakers rewards are getting paid. `next` is `None` if all pages are claimed.
         */
        PayoutStarted: PlainDescriptor<Anonymize<Ith132hqfb27q>>;
        /**
         * A validator has set their preferences.
         */
        ValidatorPrefsSet: PlainDescriptor<Anonymize<Ic19as7nbst738>>;
        /**
         * Voters size limit reached.
         */
        SnapshotVotersSizeExceeded: PlainDescriptor<Anonymize<I54umskavgc9du>>;
        /**
         * Targets size limit reached.
         */
        SnapshotTargetsSizeExceeded: PlainDescriptor<Anonymize<I54umskavgc9du>>;
        /**
        
         */
        ForceEra: PlainDescriptor<Anonymize<I2ip7o9e2tc5sf>>;
        /**
         * Report of a controller batch deprecation.
         */
        ControllerBatchDeprecated: PlainDescriptor<Anonymize<I5egvk6hadac5h>>;
        /**
         * Staking balance migrated from locks to holds, with any balance that could not be held
         * is force withdrawn.
         */
        CurrencyMigrated: PlainDescriptor<Anonymize<I1td4upnup9gqv>>;
        /**
         * A page from a multi-page election was fetched. A number of these are followed by
         * `StakersElected`.
         *
         * `Ok(count)` indicates the give number of stashes were added.
         * `Err(index)` indicates that the stashes after index were dropped.
         * `Err(0)` indicates that an error happened but no stashes were dropped nor added.
         *
         * The error indicates that a number of validators were dropped due to excess size, but
         * the overall election will continue.
         */
        PagedElectionProceeded: PlainDescriptor<Anonymize<I3m3s3nqk2k59p>>;
        /**
         * An offence for the given validator, for the given percentage of their stake, at the
         * given era as been reported.
         */
        OffenceReported: PlainDescriptor<Anonymize<I4rl33s8t7uju2>>;
        /**
         * An offence has been processed and the corresponding slash has been computed.
         */
        SlashComputed: PlainDescriptor<Anonymize<Icgsl781ka0jnq>>;
        /**
         * An unapplied slash has been cancelled.
         */
        SlashCancelled: PlainDescriptor<Anonymize<I9s54l74mrft0k>>;
        /**
         * Session change has been triggered.
         *
         * If planned_era is one era ahead of active_era, it implies new era is being planned and
         * election is ongoing.
         */
        SessionRotated: PlainDescriptor<Anonymize<Ia5ob51vsq2d0j>>;
        /**
         * Something occurred that should never happen under normal operation.
         * Logged as an event for fail-safe observability.
         */
        Unexpected: PlainDescriptor<Anonymize<Ia082gmtdk04o2>>;
        /**
         * An offence was reported that was too old to be processed, and thus was dropped.
         */
        OffenceTooOld: PlainDescriptor<Anonymize<I4rl33s8t7uju2>>;
        /**
         * An old era with the given index was pruned.
         */
        EraPruned: PlainDescriptor<Anonymize<I666bl2fqjkejo>>;
    };
    NominationPools: {
        /**
         * A pool has been created.
         */
        Created: PlainDescriptor<Anonymize<I1ti389kf8t6oi>>;
        /**
         * A member has became bonded in a pool.
         */
        Bonded: PlainDescriptor<Anonymize<If4nnre373amul>>;
        /**
         * A payout has been made to a member.
         */
        PaidOut: PlainDescriptor<Anonymize<I55kbor0ocqk6h>>;
        /**
         * A member has unbonded from their pool.
         *
         * - `balance` is the corresponding balance of the number of points that has been
         * requested to be unbonded (the argument of the `unbond` transaction) from the bonded
         * pool.
         * - `points` is the number of points that are issued as a result of `balance` being
         * dissolved into the corresponding unbonding pool.
         * - `era` is the era in which the balance will be unbonded.
         * In the absence of slashing, these values will match. In the presence of slashing, the
         * number of points that are issued in the unbonding pool will be less than the amount
         * requested to be unbonded.
         */
        Unbonded: PlainDescriptor<Anonymize<Idsj9cg7j96kpc>>;
        /**
         * A member has withdrawn from their pool.
         *
         * The given number of `points` have been dissolved in return of `balance`.
         *
         * Similar to `Unbonded` event, in the absence of slashing, the ratio of point to balance
         * will be 1.
         */
        Withdrawn: PlainDescriptor<Anonymize<Ido4u9drncfaml>>;
        /**
         * A pool has been destroyed.
         */
        Destroyed: PlainDescriptor<Anonymize<I931cottvong90>>;
        /**
         * The state of a pool has changed
         */
        StateChanged: PlainDescriptor<Anonymize<Ie8c7ctks8ur2p>>;
        /**
         * A member has been removed from a pool.
         *
         * The removal can be voluntary (withdrawn all unbonded funds) or involuntary (kicked).
         * Any funds that are still delegated (i.e. dangling delegation) are released and are
         * represented by `released_balance`.
         */
        MemberRemoved: PlainDescriptor<Anonymize<I6c6fpqmnqijqd>>;
        /**
         * The roles of a pool have been updated to the given new roles. Note that the depositor
         * can never change.
         */
        RolesUpdated: PlainDescriptor<Anonymize<I6mik29s5073td>>;
        /**
         * The active balance of pool `pool_id` has been slashed to `balance`.
         */
        PoolSlashed: PlainDescriptor<Anonymize<I2m0sqmb75cnpb>>;
        /**
         * The unbond pool at `era` of pool `pool_id` has been slashed to `balance`.
         */
        UnbondingPoolSlashed: PlainDescriptor<Anonymize<I49agc5b62mehu>>;
        /**
         * A pool's commission setting has been changed.
         */
        PoolCommissionUpdated: PlainDescriptor<Anonymize<Iatq9jda4hq6pg>>;
        /**
         * A pool's maximum commission setting has been changed.
         */
        PoolMaxCommissionUpdated: PlainDescriptor<Anonymize<I8cbluptqo8kbp>>;
        /**
         * A pool's commission `change_rate` has been changed.
         */
        PoolCommissionChangeRateUpdated: PlainDescriptor<Anonymize<I81cc4plffa1dm>>;
        /**
         * Pool commission claim permission has been updated.
         */
        PoolCommissionClaimPermissionUpdated: PlainDescriptor<Anonymize<I3ihan8icf0c5k>>;
        /**
         * Pool commission has been claimed.
         */
        PoolCommissionClaimed: PlainDescriptor<Anonymize<I2g87evcjlgmqi>>;
        /**
         * Topped up deficit in frozen ED of the reward pool.
         */
        MinBalanceDeficitAdjusted: PlainDescriptor<Anonymize<Ieg1oc56mamrl5>>;
        /**
         * Claimed excess frozen ED of af the reward pool.
         */
        MinBalanceExcessAdjusted: PlainDescriptor<Anonymize<Ieg1oc56mamrl5>>;
        /**
         * A pool member's claim permission has been updated.
         */
        MemberClaimPermissionUpdated: PlainDescriptor<Anonymize<I93ajn7brqs8df>>;
        /**
         * A pool's metadata was updated.
         */
        MetadataUpdated: PlainDescriptor<Anonymize<Ib2q8vnsr19t9b>>;
        /**
         * A pool's nominating account (or the pool's root account) has nominated a validator set
         * on behalf of the pool.
         */
        PoolNominationMade: PlainDescriptor<Anonymize<Ib2q8vnsr19t9b>>;
        /**
         * The pool is chilled i.e. no longer nominating.
         */
        PoolNominatorChilled: PlainDescriptor<Anonymize<Ib2q8vnsr19t9b>>;
        /**
         * Global parameters regulating nomination pools have been updated.
         */
        GlobalParamsUpdated: PlainDescriptor<Anonymize<If6q1q7op2gvqf>>;
    };
    VoterList: {
        /**
         * Moved an account from one bag to another.
         */
        Rebagged: PlainDescriptor<Anonymize<I37454vatvmm1l>>;
        /**
         * Updated the score of some account to the given amount.
         */
        ScoreUpdated: PlainDescriptor<Anonymize<Iblau1qa7u7fet>>;
    };
    DelegatedStaking: {
        /**
         * Funds delegated by a delegator.
         */
        Delegated: PlainDescriptor<Anonymize<Id2aanom2jncf1>>;
        /**
         * Funds released to a delegator.
         */
        Released: PlainDescriptor<Anonymize<Id2aanom2jncf1>>;
        /**
         * Funds slashed from a delegator.
         */
        Slashed: PlainDescriptor<Anonymize<Id2aanom2jncf1>>;
        /**
         * Unclaimed delegation funds migrated to delegator.
         */
        MigratedDelegation: PlainDescriptor<Anonymize<Id2aanom2jncf1>>;
    };
    StakingRcClient: {
        /**
         * A said session report was received.
         */
        SessionReportReceived: PlainDescriptor<Anonymize<I1b9s29roqhg41>>;
        /**
         * A new offence was reported.
         */
        OffenceReceived: PlainDescriptor<Anonymize<I9kd1anrch3gtm>>;
        /**
         * Something occurred that should never happen under normal operation.
         * Logged as an event for fail-safe observability.
         */
        Unexpected: PlainDescriptor<Anonymize<I34ma0kjnleq33>>;
    };
    MultiBlockElection: {
        /**
         * A phase transition happened. Only checks major changes in the variants, not minor inner
         * values.
         */
        PhaseTransitioned: PlainDescriptor<Anonymize<I44bc4bblti9at>>;
        /**
         * Target snapshot creation failed
         */
        UnexpectedTargetSnapshotFailed: PlainDescriptor<undefined>;
        /**
         * Voter snapshot creation failed
         */
        UnexpectedVoterSnapshotFailed: PlainDescriptor<undefined>;
    };
    MultiBlockElectionVerifier: {
        /**
         * A verification failed at the given page.
         *
         * NOTE: if the index is 0, then this could mean either the feasibility of the last page
         * was wrong, or the final checks of `finalize_verification` failed.
         */
        VerificationFailed: PlainDescriptor<Anonymize<Icr28nsmo3thmu>>;
        /**
         * The given page of a solution has been verified, with the given number of winners being
         * found in it.
         */
        Verified: PlainDescriptor<Anonymize<I9jd27rnpm8ttv>>;
        /**
         * A solution with the given score has replaced our current best solution.
         */
        Queued: PlainDescriptor<Anonymize<I1csu4ejte2mno>>;
    };
    MultiBlockElectionSigned: {
        /**
         * Upcoming submission has been registered for the given account, with the given score.
         */
        Registered: PlainDescriptor<Anonymize<I9lrippm0l6t0c>>;
        /**
         * A page of solution solution with the given index has been stored for the given account.
         */
        Stored: PlainDescriptor<Anonymize<Ia8896dq44k9m4>>;
        /**
         * The given account has been rewarded with the given amount.
         */
        Rewarded: PlainDescriptor<Anonymize<Icsknfl0f6r973>>;
        /**
         * The given account has been slashed with the given amount.
         */
        Slashed: PlainDescriptor<Anonymize<Icsknfl0f6r973>>;
        /**
         * The given solution, for the given round, was ejected.
         */
        Ejected: PlainDescriptor<Anonymize<I7svnfko10tq2e>>;
        /**
         * The given account has been discarded.
         */
        Discarded: PlainDescriptor<Anonymize<I7svnfko10tq2e>>;
        /**
         * The given account has bailed.
         */
        Bailed: PlainDescriptor<Anonymize<I7svnfko10tq2e>>;
    };
    Sudo: {
        /**
         * A sudo call just took place.
         */
        Sudid: PlainDescriptor<Anonymize<I24s17v9t73msr>>;
        /**
         * The sudo key has been updated.
         */
        KeyChanged: PlainDescriptor<Anonymize<I5rtkmhm2dng4u>>;
        /**
         * The key was permanently removed.
         */
        KeyRemoved: PlainDescriptor<undefined>;
        /**
         * A [sudo_as](Pallet::sudo_as) call just took place.
         */
        SudoAsDone: PlainDescriptor<Anonymize<I24s17v9t73msr>>;
    };
    AhOps: {
        /**
         * Some lease reserve could not be unreserved and needs manual cleanup.
         */
        LeaseUnreserveRemaining: PlainDescriptor<Anonymize<I4g1444e4lrvko>>;
        /**
         * Some amount for a crowdloan reserve could not be unreserved and needs manual cleanup.
         */
        CrowdloanUnreserveRemaining: PlainDescriptor<Anonymize<I4g1444e4lrvko>>;
        /**
         * A sovereign parachain account has been migrated from its child to sibling
         * representation.
         */
        SovereignMigrated: PlainDescriptor<Anonymize<I99mhtl0011mj8>>;
    };
    AhMigrator: {
        /**
         * A stage transition has occurred.
         */
        StageTransition: PlainDescriptor<Anonymize<I2sdq8bqulpaf1>>;
        /**
         * We received a batch of messages that will be integrated into a pallet.
         */
        BatchReceived: PlainDescriptor<Anonymize<I6qgvbdj59q82d>>;
        /**
         * We processed a batch of messages for this pallet.
         */
        BatchProcessed: PlainDescriptor<Anonymize<I8a7s0gpbv2c0i>>;
        /**
         * The Asset Hub Migration started and is active until `AssetHubMigrationFinished` is
         * emitted.
         *
         * This event is equivalent to `StageTransition { new: DataMigrationOngoing, .. }` but is
         * easier to understand. The activation is immediate and affects all events happening
         * afterwards.
         */
        AssetHubMigrationStarted: PlainDescriptor<undefined>;
        /**
         * The Asset Hub Migration finished.
         *
         * This event is equivalent to `StageTransition { new: MigrationDone, .. }` but is easier
         * to understand. The finishing is immediate and affects all events happening
         * afterwards.
         */
        AssetHubMigrationFinished: PlainDescriptor<undefined>;
        /**
         * Whether the DMP queue was prioritized for the next block.
         */
        DmpQueuePrioritySet: PlainDescriptor<Anonymize<I4udn5ndu0dko2>>;
        /**
         * The DMP queue priority config was set.
         */
        DmpQueuePriorityConfigSet: PlainDescriptor<Anonymize<Ifpff50mo8ndh6>>;
        /**
         * The balances before the migration were recorded.
         */
        BalancesBeforeRecordSet: PlainDescriptor<Anonymize<I1d6j3815ii0ua>>;
        /**
         * The balances before the migration were consumed.
         */
        BalancesBeforeRecordConsumed: PlainDescriptor<Anonymize<I1d6j3815ii0ua>>;
        /**
         * A referendum was cancelled because it could not be mapped.
         */
        ReferendumCanceled: PlainDescriptor<Anonymize<Ic5b47dj4coa3r>>;
        /**
         * The manager account id was set.
         */
        ManagerSet: PlainDescriptor<Anonymize<I3f9qerj1fhlkp>>;
        /**
        
         */
        AccountTranslatedParachainSovereign: PlainDescriptor<Anonymize<I7j6vt4ra6khhv>>;
        /**
        
         */
        AccountTranslatedParachainSovereignDerived: PlainDescriptor<Anonymize<Iaddpgr0qkt1u0>>;
        /**
         * An XCM message was sent.
         */
        XcmSent: PlainDescriptor<Anonymize<If8u5kl4h8070m>>;
    };
};
type IError = {
    System: {
        /**
         * The name of specification does not match between the current runtime
         * and the new runtime.
         */
        InvalidSpecName: PlainDescriptor<undefined>;
        /**
         * The specification version is not allowed to decrease between the current runtime
         * and the new runtime.
         */
        SpecVersionNeedsToIncrease: PlainDescriptor<undefined>;
        /**
         * Failed to extract the runtime version from the new runtime.
         *
         * Either calling `Core_version` or decoding `RuntimeVersion` failed.
         */
        FailedToExtractRuntimeVersion: PlainDescriptor<undefined>;
        /**
         * Suicide called when the account has non-default composite data.
         */
        NonDefaultComposite: PlainDescriptor<undefined>;
        /**
         * There is a non-zero reference count preventing the account from being purged.
         */
        NonZeroRefCount: PlainDescriptor<undefined>;
        /**
         * The origin filter prevent the call to be dispatched.
         */
        CallFiltered: PlainDescriptor<undefined>;
        /**
         * A multi-block migration is ongoing and prevents the current code from being replaced.
         */
        MultiBlockMigrationsOngoing: PlainDescriptor<undefined>;
        /**
         * The specified [`Task`] is not valid.
         */
        InvalidTask: PlainDescriptor<undefined>;
        /**
         * The specified [`Task`] failed during execution.
         */
        FailedTask: PlainDescriptor<undefined>;
        /**
         * No upgrade authorized.
         */
        NothingAuthorized: PlainDescriptor<undefined>;
        /**
         * The submitted code is not authorized.
         */
        Unauthorized: PlainDescriptor<undefined>;
    };
    ParachainSystem: {
        /**
         * Attempt to upgrade validation function while existing upgrade pending.
         */
        OverlappingUpgrades: PlainDescriptor<undefined>;
        /**
         * Polkadot currently prohibits this parachain from upgrading its validation function.
         */
        ProhibitedByPolkadot: PlainDescriptor<undefined>;
        /**
         * The supplied validation function has compiled into a blob larger than Polkadot is
         * willing to run.
         */
        TooBig: PlainDescriptor<undefined>;
        /**
         * The inherent which supplies the validation data did not run this block.
         */
        ValidationDataNotAvailable: PlainDescriptor<undefined>;
        /**
         * The inherent which supplies the host configuration did not run this block.
         */
        HostConfigurationNotAvailable: PlainDescriptor<undefined>;
        /**
         * No validation function upgrade is currently scheduled.
         */
        NotScheduled: PlainDescriptor<undefined>;
    };
    Preimage: {
        /**
         * Preimage is too large to store on-chain.
         */
        TooBig: PlainDescriptor<undefined>;
        /**
         * Preimage has already been noted on-chain.
         */
        AlreadyNoted: PlainDescriptor<undefined>;
        /**
         * The user is not authorized to perform this action.
         */
        NotAuthorized: PlainDescriptor<undefined>;
        /**
         * The preimage cannot be removed since it has not yet been noted.
         */
        NotNoted: PlainDescriptor<undefined>;
        /**
         * A preimage may not be removed when there are outstanding requests.
         */
        Requested: PlainDescriptor<undefined>;
        /**
         * The preimage request cannot be removed since no outstanding requests exist.
         */
        NotRequested: PlainDescriptor<undefined>;
        /**
         * More than `MAX_HASH_UPGRADE_BULK_COUNT` hashes were requested to be upgraded at once.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * Too few hashes were requested to be upgraded (i.e. zero).
         */
        TooFew: PlainDescriptor<undefined>;
    };
    Scheduler: {
        /**
         * Failed to schedule a call
         */
        FailedToSchedule: PlainDescriptor<undefined>;
        /**
         * Cannot find the scheduled call.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Given target block number is in the past.
         */
        TargetBlockNumberInPast: PlainDescriptor<undefined>;
        /**
         * Reschedule failed because it does not change scheduled time.
         */
        RescheduleNoChange: PlainDescriptor<undefined>;
        /**
         * Attempt to use a non-named function on a named task.
         */
        Named: PlainDescriptor<undefined>;
    };
    Balances: {
        /**
         * Vesting balance too high to send value.
         */
        VestingBalance: PlainDescriptor<undefined>;
        /**
         * Account liquidity restrictions prevent withdrawal.
         */
        LiquidityRestrictions: PlainDescriptor<undefined>;
        /**
         * Balance too low to send value.
         */
        InsufficientBalance: PlainDescriptor<undefined>;
        /**
         * Value too low to create account due to existential deposit.
         */
        ExistentialDeposit: PlainDescriptor<undefined>;
        /**
         * Transfer/payment would kill account.
         */
        Expendability: PlainDescriptor<undefined>;
        /**
         * A vesting schedule already exists for this account.
         */
        ExistingVestingSchedule: PlainDescriptor<undefined>;
        /**
         * Beneficiary account must pre-exist.
         */
        DeadAccount: PlainDescriptor<undefined>;
        /**
         * Number of named reserves exceed `MaxReserves`.
         */
        TooManyReserves: PlainDescriptor<undefined>;
        /**
         * Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
         */
        TooManyHolds: PlainDescriptor<undefined>;
        /**
         * Number of freezes exceed `MaxFreezes`.
         */
        TooManyFreezes: PlainDescriptor<undefined>;
        /**
         * The issuance cannot be modified since it is already deactivated.
         */
        IssuanceDeactivated: PlainDescriptor<undefined>;
        /**
         * The delta cannot be zero.
         */
        DeltaZero: PlainDescriptor<undefined>;
    };
    Vesting: {
        /**
         * The account given is not vesting.
         */
        NotVesting: PlainDescriptor<undefined>;
        /**
         * The account already has `MaxVestingSchedules` count of schedules and thus
         * cannot add another one. Consider merging existing schedules in order to add another.
         */
        AtMaxVestingSchedules: PlainDescriptor<undefined>;
        /**
         * Amount being transferred is too low to create a vesting schedule.
         */
        AmountLow: PlainDescriptor<undefined>;
        /**
         * An index was out of bounds of the vesting schedules.
         */
        ScheduleIndexOutOfBounds: PlainDescriptor<undefined>;
        /**
         * Failed to create a new schedule because some parameter was invalid.
         */
        InvalidScheduleParams: PlainDescriptor<undefined>;
    };
    Claims: {
        /**
         * Invalid Ethereum signature.
         */
        InvalidEthereumSignature: PlainDescriptor<undefined>;
        /**
         * Ethereum address has no claim.
         */
        SignerHasNoClaim: PlainDescriptor<undefined>;
        /**
         * Account ID sending transaction has no claim.
         */
        SenderHasNoClaim: PlainDescriptor<undefined>;
        /**
         * There's not enough in the pot to pay out some unvested amount. Generally implies a
         * logic error.
         */
        PotUnderflow: PlainDescriptor<undefined>;
        /**
         * A needed statement was not included.
         */
        InvalidStatement: PlainDescriptor<undefined>;
        /**
         * The account already has a vested balance.
         */
        VestedBalanceExists: PlainDescriptor<undefined>;
    };
    CollatorSelection: {
        /**
         * The pallet has too many candidates.
         */
        TooManyCandidates: PlainDescriptor<undefined>;
        /**
         * Leaving would result in too few candidates.
         */
        TooFewEligibleCollators: PlainDescriptor<undefined>;
        /**
         * Account is already a candidate.
         */
        AlreadyCandidate: PlainDescriptor<undefined>;
        /**
         * Account is not a candidate.
         */
        NotCandidate: PlainDescriptor<undefined>;
        /**
         * There are too many Invulnerables.
         */
        TooManyInvulnerables: PlainDescriptor<undefined>;
        /**
         * Account is already an Invulnerable.
         */
        AlreadyInvulnerable: PlainDescriptor<undefined>;
        /**
         * Account is not an Invulnerable.
         */
        NotInvulnerable: PlainDescriptor<undefined>;
        /**
         * Account has no associated validator ID.
         */
        NoAssociatedValidatorId: PlainDescriptor<undefined>;
        /**
         * Validator ID is not yet registered.
         */
        ValidatorNotRegistered: PlainDescriptor<undefined>;
        /**
         * Could not insert in the candidate list.
         */
        InsertToCandidateListFailed: PlainDescriptor<undefined>;
        /**
         * Could not remove from the candidate list.
         */
        RemoveFromCandidateListFailed: PlainDescriptor<undefined>;
        /**
         * New deposit amount would be below the minimum candidacy bond.
         */
        DepositTooLow: PlainDescriptor<undefined>;
        /**
         * Could not update the candidate list.
         */
        UpdateCandidateListFailed: PlainDescriptor<undefined>;
        /**
         * Deposit amount is too low to take the target's slot in the candidate list.
         */
        InsufficientBond: PlainDescriptor<undefined>;
        /**
         * The target account to be replaced in the candidate list is not a candidate.
         */
        TargetIsNotCandidate: PlainDescriptor<undefined>;
        /**
         * The updated deposit amount is equal to the amount already reserved.
         */
        IdenticalDeposit: PlainDescriptor<undefined>;
        /**
         * Cannot lower candidacy bond while occupying a future collator slot in the list.
         */
        InvalidUnreserve: PlainDescriptor<undefined>;
    };
    Session: {
        /**
         * Invalid ownership proof.
         */
        InvalidProof: PlainDescriptor<undefined>;
        /**
         * No associated validator ID for account.
         */
        NoAssociatedValidatorId: PlainDescriptor<undefined>;
        /**
         * Registered duplicate key.
         */
        DuplicatedKey: PlainDescriptor<undefined>;
        /**
         * No keys are associated with this account.
         */
        NoKeys: PlainDescriptor<undefined>;
        /**
         * Key setting account is not live, so it's impossible to associate keys.
         */
        NoAccount: PlainDescriptor<undefined>;
    };
    XcmpQueue: {
        /**
         * Setting the queue config failed since one of its values was invalid.
         */
        BadQueueConfig: PlainDescriptor<undefined>;
        /**
         * The execution is already suspended.
         */
        AlreadySuspended: PlainDescriptor<undefined>;
        /**
         * The execution is already resumed.
         */
        AlreadyResumed: PlainDescriptor<undefined>;
        /**
         * There are too many active outbound channels.
         */
        TooManyActiveOutboundChannels: PlainDescriptor<undefined>;
        /**
         * The message is too big.
         */
        TooBig: PlainDescriptor<undefined>;
    };
    PolkadotXcm: {
        /**
         * The desired destination was unreachable, generally because there is a no way of routing
         * to it.
         */
        Unreachable: PlainDescriptor<undefined>;
        /**
         * There was some other issue (i.e. not to do with routing) in sending the message.
         * Perhaps a lack of space for buffering the message.
         */
        SendFailure: PlainDescriptor<undefined>;
        /**
         * The message execution fails the filter.
         */
        Filtered: PlainDescriptor<undefined>;
        /**
         * The message's weight could not be determined.
         */
        UnweighableMessage: PlainDescriptor<undefined>;
        /**
         * The destination `Location` provided cannot be inverted.
         */
        DestinationNotInvertible: PlainDescriptor<undefined>;
        /**
         * The assets to be sent are empty.
         */
        Empty: PlainDescriptor<undefined>;
        /**
         * Could not re-anchor the assets to declare the fees for the destination chain.
         */
        CannotReanchor: PlainDescriptor<undefined>;
        /**
         * Too many assets have been attempted for transfer.
         */
        TooManyAssets: PlainDescriptor<undefined>;
        /**
         * Origin is invalid for sending.
         */
        InvalidOrigin: PlainDescriptor<undefined>;
        /**
         * The version of the `Versioned` value used is not able to be interpreted.
         */
        BadVersion: PlainDescriptor<undefined>;
        /**
         * The given location could not be used (e.g. because it cannot be expressed in the
         * desired version of XCM).
         */
        BadLocation: PlainDescriptor<undefined>;
        /**
         * The referenced subscription could not be found.
         */
        NoSubscription: PlainDescriptor<undefined>;
        /**
         * The location is invalid since it already has a subscription from us.
         */
        AlreadySubscribed: PlainDescriptor<undefined>;
        /**
         * Could not check-out the assets for teleportation to the destination chain.
         */
        CannotCheckOutTeleport: PlainDescriptor<undefined>;
        /**
         * The owner does not own (all) of the asset that they wish to do the operation on.
         */
        LowBalance: PlainDescriptor<undefined>;
        /**
         * The asset owner has too many locks on the asset.
         */
        TooManyLocks: PlainDescriptor<undefined>;
        /**
         * The given account is not an identifiable sovereign account for any location.
         */
        AccountNotSovereign: PlainDescriptor<undefined>;
        /**
         * The operation required fees to be paid which the initiator could not meet.
         */
        FeesNotMet: PlainDescriptor<undefined>;
        /**
         * A remote lock with the corresponding data could not be found.
         */
        LockNotFound: PlainDescriptor<undefined>;
        /**
         * The unlock operation cannot succeed because there are still consumers of the lock.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid asset, reserve chain could not be determined for it.
         */
        InvalidAssetUnknownReserve: PlainDescriptor<undefined>;
        /**
         * Invalid asset, do not support remote asset reserves with different fees reserves.
         */
        InvalidAssetUnsupportedReserve: PlainDescriptor<undefined>;
        /**
         * Too many assets with different reserve locations have been attempted for transfer.
         */
        TooManyReserves: PlainDescriptor<undefined>;
        /**
         * Local XCM execution incomplete.
         */
        LocalExecutionIncomplete: PlainDescriptor<undefined>;
        /**
         * Too many locations authorized to alias origin.
         */
        TooManyAuthorizedAliases: PlainDescriptor<undefined>;
        /**
         * Expiry block number is in the past.
         */
        ExpiresInPast: PlainDescriptor<undefined>;
        /**
         * The alias to remove authorization for was not found.
         */
        AliasNotFound: PlainDescriptor<undefined>;
        /**
         * Local XCM execution incomplete with the actual XCM error and the index of the
         * instruction that caused the error.
         */
        LocalExecutionIncompleteWithError: PlainDescriptor<Anonymize<I5r8t4iaend96p>>;
    };
    MessageQueue: {
        /**
         * Page is not reapable because it has items remaining to be processed and is not old
         * enough.
         */
        NotReapable: PlainDescriptor<undefined>;
        /**
         * Page to be reaped does not exist.
         */
        NoPage: PlainDescriptor<undefined>;
        /**
         * The referenced message could not be found.
         */
        NoMessage: PlainDescriptor<undefined>;
        /**
         * The message was already processed and cannot be processed again.
         */
        AlreadyProcessed: PlainDescriptor<undefined>;
        /**
         * The message is queued for future execution.
         */
        Queued: PlainDescriptor<undefined>;
        /**
         * There is temporarily not enough weight to continue servicing messages.
         */
        InsufficientWeight: PlainDescriptor<undefined>;
        /**
         * This message is temporarily unprocessable.
         *
         * Such errors are expected, but not guaranteed, to resolve themselves eventually through
         * retrying.
         */
        TemporarilyUnprocessable: PlainDescriptor<undefined>;
        /**
         * The queue is paused and no message can be executed from it.
         *
         * This can change at any time and may resolve in the future by re-trying.
         */
        QueuePaused: PlainDescriptor<undefined>;
        /**
         * Another call is in progress and needs to finish before this call can happen.
         */
        RecursiveDisallowed: PlainDescriptor<undefined>;
    };
    SnowbridgeSystemFrontend: {
        /**
         * Convert versioned location failure
         */
        UnsupportedLocationVersion: PlainDescriptor<undefined>;
        /**
         * Check location failure, should start from the dispatch origin as owner
         */
        InvalidAssetOwner: PlainDescriptor<undefined>;
        /**
         * Send xcm message failure
         */
        SendFailure: PlainDescriptor<undefined>;
        /**
         * Withdraw fee asset failure
         */
        FeesNotMet: PlainDescriptor<undefined>;
        /**
         * Convert to reanchored location failure
         */
        LocationConversionFailed: PlainDescriptor<undefined>;
        /**
         * Message export is halted
         */
        Halted: PlainDescriptor<undefined>;
        /**
         * The desired destination was unreachable, generally because there is a no way of routing
         * to it.
         */
        Unreachable: PlainDescriptor<undefined>;
        /**
         * The asset provided for the tip is unsupported.
         */
        UnsupportedAsset: PlainDescriptor<undefined>;
        /**
         * Unable to withdraw asset.
         */
        WithdrawError: PlainDescriptor<undefined>;
        /**
         * Account could not be converted to a location.
         */
        InvalidAccount: PlainDescriptor<undefined>;
        /**
         * Provided tip asset could not be swapped for ether.
         */
        SwapError: PlainDescriptor<undefined>;
        /**
         * Ether could not be burned.
         */
        BurnError: PlainDescriptor<undefined>;
        /**
         * The tip provided is zero.
         */
        TipAmountZero: PlainDescriptor<undefined>;
    };
    Utility: {
        /**
         * Too many calls batched.
         */
        TooManyCalls: PlainDescriptor<undefined>;
    };
    Multisig: {
        /**
         * Threshold must be 2 or greater.
         */
        MinimumThreshold: PlainDescriptor<undefined>;
        /**
         * Call is already approved by this signatory.
         */
        AlreadyApproved: PlainDescriptor<undefined>;
        /**
         * Call doesn't need any (more) approvals.
         */
        NoApprovalsNeeded: PlainDescriptor<undefined>;
        /**
         * There are too few signatories in the list.
         */
        TooFewSignatories: PlainDescriptor<undefined>;
        /**
         * There are too many signatories in the list.
         */
        TooManySignatories: PlainDescriptor<undefined>;
        /**
         * The signatories were provided out of order; they should be ordered.
         */
        SignatoriesOutOfOrder: PlainDescriptor<undefined>;
        /**
         * The sender was contained in the other signatories; it shouldn't be.
         */
        SenderInSignatories: PlainDescriptor<undefined>;
        /**
         * Multisig operation not found in storage.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Only the account that originally created the multisig is able to cancel it or update
         * its deposits.
         */
        NotOwner: PlainDescriptor<undefined>;
        /**
         * No timepoint was given, yet the multisig operation is already underway.
         */
        NoTimepoint: PlainDescriptor<undefined>;
        /**
         * A different timepoint was given to the multisig operation that is underway.
         */
        WrongTimepoint: PlainDescriptor<undefined>;
        /**
         * A timepoint was given, yet no multisig operation is underway.
         */
        UnexpectedTimepoint: PlainDescriptor<undefined>;
        /**
         * The maximum weight information provided was too low.
         */
        MaxWeightTooLow: PlainDescriptor<undefined>;
        /**
         * The data to be stored is already stored.
         */
        AlreadyStored: PlainDescriptor<undefined>;
    };
    Proxy: {
        /**
         * There are too many proxies registered or too many announcements pending.
         */
        TooMany: PlainDescriptor<undefined>;
        /**
         * Proxy registration not found.
         */
        NotFound: PlainDescriptor<undefined>;
        /**
         * Sender is not a proxy of the account to be proxied.
         */
        NotProxy: PlainDescriptor<undefined>;
        /**
         * A call which is incompatible with the proxy type's filter was attempted.
         */
        Unproxyable: PlainDescriptor<undefined>;
        /**
         * Account is already a proxy.
         */
        Duplicate: PlainDescriptor<undefined>;
        /**
         * Call may not be made by proxy because it may escalate its privileges.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * Announcement, if made at all, was made too recently.
         */
        Unannounced: PlainDescriptor<undefined>;
        /**
         * Cannot add self as proxy.
         */
        NoSelfProxy: PlainDescriptor<undefined>;
    };
    Indices: {
        /**
         * The index was not already assigned.
         */
        NotAssigned: PlainDescriptor<undefined>;
        /**
         * The index is assigned to another account.
         */
        NotOwner: PlainDescriptor<undefined>;
        /**
         * The index was not available.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * The source and destination accounts are identical.
         */
        NotTransfer: PlainDescriptor<undefined>;
        /**
         * The index is permanent and may not be freed/changed.
         */
        Permanent: PlainDescriptor<undefined>;
    };
    Assets: {
        /**
         * Account balance must be greater than or equal to the transfer amount.
         */
        BalanceLow: PlainDescriptor<undefined>;
        /**
         * The account to alter does not exist.
         */
        NoAccount: PlainDescriptor<undefined>;
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given asset ID is unknown.
         */
        Unknown: PlainDescriptor<undefined>;
        /**
         * The origin account is frozen.
         */
        Frozen: PlainDescriptor<undefined>;
        /**
         * The asset ID is already taken.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid witness data given.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Minimum balance should be non-zero.
         */
        MinBalanceZero: PlainDescriptor<undefined>;
        /**
         * Unable to increment the consumer reference counters on the account. Either no provider
         * reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
         * fewer then the maximum number of consumers has been reached.
         */
        UnavailableConsumer: PlainDescriptor<undefined>;
        /**
         * Invalid metadata given.
         */
        BadMetadata: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The source account would not survive the transfer and it needs to stay alive.
         */
        WouldDie: PlainDescriptor<undefined>;
        /**
         * The asset-account already exists.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The asset-account doesn't have an associated deposit.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The operation would result in funds being burned.
         */
        WouldBurn: PlainDescriptor<undefined>;
        /**
         * The asset is a live asset and is actively being used. Usually emit for operations such
         * as `start_destroy` which require the asset to be in a destroying state.
         */
        LiveAsset: PlainDescriptor<undefined>;
        /**
         * The asset is not live, and likely being destroyed.
         */
        AssetNotLive: PlainDescriptor<undefined>;
        /**
         * The asset status is not the expected status.
         */
        IncorrectStatus: PlainDescriptor<undefined>;
        /**
         * The asset should be frozen before the given operation.
         */
        NotFrozen: PlainDescriptor<undefined>;
        /**
         * Callback action resulted in error
         */
        CallbackFailed: PlainDescriptor<undefined>;
        /**
         * The asset ID must be equal to the [`NextAssetId`].
         */
        BadAssetId: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain freezes.
         */
        ContainsFreezes: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain holds.
         */
        ContainsHolds: PlainDescriptor<undefined>;
    };
    Uniques: {
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given item ID is unknown.
         */
        UnknownCollection: PlainDescriptor<undefined>;
        /**
         * The item ID has already been used for an item.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The owner turned out to be different to what was expected.
         */
        WrongOwner: PlainDescriptor<undefined>;
        /**
         * Invalid witness data given.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * The item ID is already taken.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * The item or collection is frozen.
         */
        Frozen: PlainDescriptor<undefined>;
        /**
         * The delegate turned out to be different to what was expected.
         */
        WrongDelegate: PlainDescriptor<undefined>;
        /**
         * There is no delegate approved.
         */
        NoDelegate: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The named owner has not signed ownership of the collection is acceptable.
         */
        Unaccepted: PlainDescriptor<undefined>;
        /**
         * The item is locked.
         */
        Locked: PlainDescriptor<undefined>;
        /**
         * All items have been minted.
         */
        MaxSupplyReached: PlainDescriptor<undefined>;
        /**
         * The max supply has already been set.
         */
        MaxSupplyAlreadySet: PlainDescriptor<undefined>;
        /**
         * The provided max supply is less to the amount of items a collection already has.
         */
        MaxSupplyTooSmall: PlainDescriptor<undefined>;
        /**
         * The given item ID is unknown.
         */
        UnknownItem: PlainDescriptor<undefined>;
        /**
         * Item is not for sale.
         */
        NotForSale: PlainDescriptor<undefined>;
        /**
         * The provided bid is too low.
         */
        BidTooLow: PlainDescriptor<undefined>;
        /**
         * No metadata is found.
         */
        NoMetadata: PlainDescriptor<undefined>;
        /**
         * Wrong metadata key/value bytes supplied.
         */
        WrongMetadata: PlainDescriptor<undefined>;
        /**
         * An attribute is not found.
         */
        AttributeNotFound: PlainDescriptor<undefined>;
        /**
         * Wrong attribute key/value bytes supplied.
         */
        WrongAttribute: PlainDescriptor<undefined>;
    };
    Nfts: {
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given item ID is unknown.
         */
        UnknownCollection: PlainDescriptor<undefined>;
        /**
         * The item ID has already been used for an item.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The approval had a deadline that expired, so the approval isn't valid anymore.
         */
        ApprovalExpired: PlainDescriptor<undefined>;
        /**
         * The owner turned out to be different to what was expected.
         */
        WrongOwner: PlainDescriptor<undefined>;
        /**
         * The witness data given does not match the current state of the chain.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Collection ID is already taken.
         */
        CollectionIdInUse: PlainDescriptor<undefined>;
        /**
         * Items within that collection are non-transferable.
         */
        ItemsNonTransferable: PlainDescriptor<undefined>;
        /**
         * The provided account is not a delegate.
         */
        NotDelegate: PlainDescriptor<undefined>;
        /**
         * The delegate turned out to be different to what was expected.
         */
        WrongDelegate: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The named owner has not signed ownership acceptance of the collection.
         */
        Unaccepted: PlainDescriptor<undefined>;
        /**
         * The item is locked (non-transferable).
         */
        ItemLocked: PlainDescriptor<undefined>;
        /**
         * Item's attributes are locked.
         */
        LockedItemAttributes: PlainDescriptor<undefined>;
        /**
         * Collection's attributes are locked.
         */
        LockedCollectionAttributes: PlainDescriptor<undefined>;
        /**
         * Item's metadata is locked.
         */
        LockedItemMetadata: PlainDescriptor<undefined>;
        /**
         * Collection's metadata is locked.
         */
        LockedCollectionMetadata: PlainDescriptor<undefined>;
        /**
         * All items have been minted.
         */
        MaxSupplyReached: PlainDescriptor<undefined>;
        /**
         * The max supply is locked and can't be changed.
         */
        MaxSupplyLocked: PlainDescriptor<undefined>;
        /**
         * The provided max supply is less than the number of items a collection already has.
         */
        MaxSupplyTooSmall: PlainDescriptor<undefined>;
        /**
         * The given item ID is unknown.
         */
        UnknownItem: PlainDescriptor<undefined>;
        /**
         * Swap doesn't exist.
         */
        UnknownSwap: PlainDescriptor<undefined>;
        /**
         * The given item has no metadata set.
         */
        MetadataNotFound: PlainDescriptor<undefined>;
        /**
         * The provided attribute can't be found.
         */
        AttributeNotFound: PlainDescriptor<undefined>;
        /**
         * Item is not for sale.
         */
        NotForSale: PlainDescriptor<undefined>;
        /**
         * The provided bid is too low.
         */
        BidTooLow: PlainDescriptor<undefined>;
        /**
         * The item has reached its approval limit.
         */
        ReachedApprovalLimit: PlainDescriptor<undefined>;
        /**
         * The deadline has already expired.
         */
        DeadlineExpired: PlainDescriptor<undefined>;
        /**
         * The duration provided should be less than or equal to `MaxDeadlineDuration`.
         */
        WrongDuration: PlainDescriptor<undefined>;
        /**
         * The method is disabled by system settings.
         */
        MethodDisabled: PlainDescriptor<undefined>;
        /**
         * The provided setting can't be set.
         */
        WrongSetting: PlainDescriptor<undefined>;
        /**
         * Item's config already exists and should be equal to the provided one.
         */
        InconsistentItemConfig: PlainDescriptor<undefined>;
        /**
         * Config for a collection or an item can't be found.
         */
        NoConfig: PlainDescriptor<undefined>;
        /**
         * Some roles were not cleared.
         */
        RolesNotCleared: PlainDescriptor<undefined>;
        /**
         * Mint has not started yet.
         */
        MintNotStarted: PlainDescriptor<undefined>;
        /**
         * Mint has already ended.
         */
        MintEnded: PlainDescriptor<undefined>;
        /**
         * The provided Item was already used for claiming.
         */
        AlreadyClaimed: PlainDescriptor<undefined>;
        /**
         * The provided data is incorrect.
         */
        IncorrectData: PlainDescriptor<undefined>;
        /**
         * The extrinsic was sent by the wrong origin.
         */
        WrongOrigin: PlainDescriptor<undefined>;
        /**
         * The provided signature is incorrect.
         */
        WrongSignature: PlainDescriptor<undefined>;
        /**
         * The provided metadata might be too long.
         */
        IncorrectMetadata: PlainDescriptor<undefined>;
        /**
         * Can't set more attributes per one call.
         */
        MaxAttributesLimitReached: PlainDescriptor<undefined>;
        /**
         * The provided namespace isn't supported in this call.
         */
        WrongNamespace: PlainDescriptor<undefined>;
        /**
         * Can't delete non-empty collections.
         */
        CollectionNotEmpty: PlainDescriptor<undefined>;
        /**
         * The witness data should be provided.
         */
        WitnessRequired: PlainDescriptor<undefined>;
    };
    ForeignAssets: {
        /**
         * Account balance must be greater than or equal to the transfer amount.
         */
        BalanceLow: PlainDescriptor<undefined>;
        /**
         * The account to alter does not exist.
         */
        NoAccount: PlainDescriptor<undefined>;
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given asset ID is unknown.
         */
        Unknown: PlainDescriptor<undefined>;
        /**
         * The origin account is frozen.
         */
        Frozen: PlainDescriptor<undefined>;
        /**
         * The asset ID is already taken.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid witness data given.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Minimum balance should be non-zero.
         */
        MinBalanceZero: PlainDescriptor<undefined>;
        /**
         * Unable to increment the consumer reference counters on the account. Either no provider
         * reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
         * fewer then the maximum number of consumers has been reached.
         */
        UnavailableConsumer: PlainDescriptor<undefined>;
        /**
         * Invalid metadata given.
         */
        BadMetadata: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The source account would not survive the transfer and it needs to stay alive.
         */
        WouldDie: PlainDescriptor<undefined>;
        /**
         * The asset-account already exists.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The asset-account doesn't have an associated deposit.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The operation would result in funds being burned.
         */
        WouldBurn: PlainDescriptor<undefined>;
        /**
         * The asset is a live asset and is actively being used. Usually emit for operations such
         * as `start_destroy` which require the asset to be in a destroying state.
         */
        LiveAsset: PlainDescriptor<undefined>;
        /**
         * The asset is not live, and likely being destroyed.
         */
        AssetNotLive: PlainDescriptor<undefined>;
        /**
         * The asset status is not the expected status.
         */
        IncorrectStatus: PlainDescriptor<undefined>;
        /**
         * The asset should be frozen before the given operation.
         */
        NotFrozen: PlainDescriptor<undefined>;
        /**
         * Callback action resulted in error
         */
        CallbackFailed: PlainDescriptor<undefined>;
        /**
         * The asset ID must be equal to the [`NextAssetId`].
         */
        BadAssetId: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain freezes.
         */
        ContainsFreezes: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain holds.
         */
        ContainsHolds: PlainDescriptor<undefined>;
    };
    PoolAssets: {
        /**
         * Account balance must be greater than or equal to the transfer amount.
         */
        BalanceLow: PlainDescriptor<undefined>;
        /**
         * The account to alter does not exist.
         */
        NoAccount: PlainDescriptor<undefined>;
        /**
         * The signing account has no permission to do the operation.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The given asset ID is unknown.
         */
        Unknown: PlainDescriptor<undefined>;
        /**
         * The origin account is frozen.
         */
        Frozen: PlainDescriptor<undefined>;
        /**
         * The asset ID is already taken.
         */
        InUse: PlainDescriptor<undefined>;
        /**
         * Invalid witness data given.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Minimum balance should be non-zero.
         */
        MinBalanceZero: PlainDescriptor<undefined>;
        /**
         * Unable to increment the consumer reference counters on the account. Either no provider
         * reference exists to allow a non-zero balance of a non-self-sufficient asset, or one
         * fewer then the maximum number of consumers has been reached.
         */
        UnavailableConsumer: PlainDescriptor<undefined>;
        /**
         * Invalid metadata given.
         */
        BadMetadata: PlainDescriptor<undefined>;
        /**
         * No approval exists that would allow the transfer.
         */
        Unapproved: PlainDescriptor<undefined>;
        /**
         * The source account would not survive the transfer and it needs to stay alive.
         */
        WouldDie: PlainDescriptor<undefined>;
        /**
         * The asset-account already exists.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * The asset-account doesn't have an associated deposit.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The operation would result in funds being burned.
         */
        WouldBurn: PlainDescriptor<undefined>;
        /**
         * The asset is a live asset and is actively being used. Usually emit for operations such
         * as `start_destroy` which require the asset to be in a destroying state.
         */
        LiveAsset: PlainDescriptor<undefined>;
        /**
         * The asset is not live, and likely being destroyed.
         */
        AssetNotLive: PlainDescriptor<undefined>;
        /**
         * The asset status is not the expected status.
         */
        IncorrectStatus: PlainDescriptor<undefined>;
        /**
         * The asset should be frozen before the given operation.
         */
        NotFrozen: PlainDescriptor<undefined>;
        /**
         * Callback action resulted in error
         */
        CallbackFailed: PlainDescriptor<undefined>;
        /**
         * The asset ID must be equal to the [`NextAssetId`].
         */
        BadAssetId: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain freezes.
         */
        ContainsFreezes: PlainDescriptor<undefined>;
        /**
         * The asset cannot be destroyed because some accounts for this asset contain holds.
         */
        ContainsHolds: PlainDescriptor<undefined>;
    };
    AssetConversion: {
        /**
         * Provided asset pair is not supported for pool.
         */
        InvalidAssetPair: PlainDescriptor<undefined>;
        /**
         * Pool already exists.
         */
        PoolExists: PlainDescriptor<undefined>;
        /**
         * Desired amount can't be zero.
         */
        WrongDesiredAmount: PlainDescriptor<undefined>;
        /**
         * Provided amount should be greater than or equal to the existential deposit/asset's
         * minimal amount.
         */
        AmountOneLessThanMinimal: PlainDescriptor<undefined>;
        /**
         * Provided amount should be greater than or equal to the existential deposit/asset's
         * minimal amount.
         */
        AmountTwoLessThanMinimal: PlainDescriptor<undefined>;
        /**
         * Reserve needs to always be greater than or equal to the existential deposit/asset's
         * minimal amount.
         */
        ReserveLeftLessThanMinimal: PlainDescriptor<undefined>;
        /**
         * Desired amount can't be equal to the pool reserve.
         */
        AmountOutTooHigh: PlainDescriptor<undefined>;
        /**
         * The pool doesn't exist.
         */
        PoolNotFound: PlainDescriptor<undefined>;
        /**
         * An overflow happened.
         */
        Overflow: PlainDescriptor<undefined>;
        /**
         * The minimal amount requirement for the first token in the pair wasn't met.
         */
        AssetOneDepositDidNotMeetMinimum: PlainDescriptor<undefined>;
        /**
         * The minimal amount requirement for the second token in the pair wasn't met.
         */
        AssetTwoDepositDidNotMeetMinimum: PlainDescriptor<undefined>;
        /**
         * The minimal amount requirement for the first token in the pair wasn't met.
         */
        AssetOneWithdrawalDidNotMeetMinimum: PlainDescriptor<undefined>;
        /**
         * The minimal amount requirement for the second token in the pair wasn't met.
         */
        AssetTwoWithdrawalDidNotMeetMinimum: PlainDescriptor<undefined>;
        /**
         * Optimal calculated amount is less than desired.
         */
        OptimalAmountLessThanDesired: PlainDescriptor<undefined>;
        /**
         * Insufficient liquidity minted.
         */
        InsufficientLiquidityMinted: PlainDescriptor<undefined>;
        /**
         * Requested liquidity can't be zero.
         */
        ZeroLiquidity: PlainDescriptor<undefined>;
        /**
         * Amount can't be zero.
         */
        ZeroAmount: PlainDescriptor<undefined>;
        /**
         * Calculated amount out is less than provided minimum amount.
         */
        ProvidedMinimumNotSufficientForSwap: PlainDescriptor<undefined>;
        /**
         * Provided maximum amount is not sufficient for swap.
         */
        ProvidedMaximumNotSufficientForSwap: PlainDescriptor<undefined>;
        /**
         * The provided path must consists of 2 assets at least.
         */
        InvalidPath: PlainDescriptor<undefined>;
        /**
         * The provided path must consists of unique assets.
         */
        NonUniquePath: PlainDescriptor<undefined>;
        /**
         * It was not possible to get or increment the Id of the pool.
         */
        IncorrectPoolAssetId: PlainDescriptor<undefined>;
        /**
         * The destination account cannot exist with the swapped funds.
         */
        BelowMinimum: PlainDescriptor<undefined>;
    };
    Treasury: {
        /**
         * No proposal, bounty or spend at that index.
         */
        InvalidIndex: PlainDescriptor<undefined>;
        /**
         * Too many approvals in the queue.
         */
        TooManyApprovals: PlainDescriptor<undefined>;
        /**
         * The spend origin is valid but the amount it is allowed to spend is lower than the
         * amount to be spent.
         */
        InsufficientPermission: PlainDescriptor<undefined>;
        /**
         * Proposal has not been approved.
         */
        ProposalNotApproved: PlainDescriptor<undefined>;
        /**
         * The balance of the asset kind is not convertible to the balance of the native asset.
         */
        FailedToConvertBalance: PlainDescriptor<undefined>;
        /**
         * The spend has expired and cannot be claimed.
         */
        SpendExpired: PlainDescriptor<undefined>;
        /**
         * The spend is not yet eligible for payout.
         */
        EarlyPayout: PlainDescriptor<undefined>;
        /**
         * The payment has already been attempted.
         */
        AlreadyAttempted: PlainDescriptor<undefined>;
        /**
         * There was some issue with the mechanism of payment.
         */
        PayoutError: PlainDescriptor<undefined>;
        /**
         * The payout was not yet attempted/claimed.
         */
        NotAttempted: PlainDescriptor<undefined>;
        /**
         * The payment has neither failed nor succeeded yet.
         */
        Inconclusive: PlainDescriptor<undefined>;
    };
    ConvictionVoting: {
        /**
         * Poll is not ongoing.
         */
        NotOngoing: PlainDescriptor<undefined>;
        /**
         * The given account did not vote on the poll.
         */
        NotVoter: PlainDescriptor<undefined>;
        /**
         * The actor has no permission to conduct the action.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The actor has no permission to conduct the action right now but will do in the future.
         */
        NoPermissionYet: PlainDescriptor<undefined>;
        /**
         * The account is already delegating.
         */
        AlreadyDelegating: PlainDescriptor<undefined>;
        /**
         * The account currently has votes attached to it and the operation cannot succeed until
         * these are removed through `remove_vote`.
         */
        AlreadyVoting: PlainDescriptor<undefined>;
        /**
         * Too high a balance was provided that the account cannot afford.
         */
        InsufficientFunds: PlainDescriptor<undefined>;
        /**
         * The account is not currently delegating.
         */
        NotDelegating: PlainDescriptor<undefined>;
        /**
         * Delegation to oneself makes no sense.
         */
        Nonsense: PlainDescriptor<undefined>;
        /**
         * Maximum number of votes reached.
         */
        MaxVotesReached: PlainDescriptor<undefined>;
        /**
         * The class must be supplied since it is not easily determinable from the state.
         */
        ClassNeeded: PlainDescriptor<undefined>;
        /**
         * The class ID supplied is invalid.
         */
        BadClass: PlainDescriptor<undefined>;
    };
    Referenda: {
        /**
         * Referendum is not ongoing.
         */
        NotOngoing: PlainDescriptor<undefined>;
        /**
         * Referendum's decision deposit is already paid.
         */
        HasDeposit: PlainDescriptor<undefined>;
        /**
         * The track identifier given was invalid.
         */
        BadTrack: PlainDescriptor<undefined>;
        /**
         * There are already a full complement of referenda in progress for this track.
         */
        Full: PlainDescriptor<undefined>;
        /**
         * The queue of the track is empty.
         */
        QueueEmpty: PlainDescriptor<undefined>;
        /**
         * The referendum index provided is invalid in this context.
         */
        BadReferendum: PlainDescriptor<undefined>;
        /**
         * There was nothing to do in the advancement.
         */
        NothingToDo: PlainDescriptor<undefined>;
        /**
         * No track exists for the proposal origin.
         */
        NoTrack: PlainDescriptor<undefined>;
        /**
         * Any deposit cannot be refunded until after the decision is over.
         */
        Unfinished: PlainDescriptor<undefined>;
        /**
         * The deposit refunder is not the depositor.
         */
        NoPermission: PlainDescriptor<undefined>;
        /**
         * The deposit cannot be refunded since none was made.
         */
        NoDeposit: PlainDescriptor<undefined>;
        /**
         * The referendum status is invalid for this operation.
         */
        BadStatus: PlainDescriptor<undefined>;
        /**
         * The preimage does not exist.
         */
        PreimageNotExist: PlainDescriptor<undefined>;
        /**
         * The preimage is stored with a different length than the one provided.
         */
        PreimageStoredWithDifferentLength: PlainDescriptor<undefined>;
    };
    Whitelist: {
        /**
         * The preimage of the call hash could not be loaded.
         */
        UnavailablePreImage: PlainDescriptor<undefined>;
        /**
         * The call could not be decoded.
         */
        UndecodableCall: PlainDescriptor<undefined>;
        /**
         * The weight of the decoded call was higher than the witness.
         */
        InvalidCallWeightWitness: PlainDescriptor<undefined>;
        /**
         * The call was not whitelisted.
         */
        CallIsNotWhitelisted: PlainDescriptor<undefined>;
        /**
         * The call was already whitelisted; No-Op.
         */
        CallAlreadyWhitelisted: PlainDescriptor<undefined>;
    };
    Bounties: {
        /**
         * Proposer's balance is too low.
         */
        InsufficientProposersBalance: PlainDescriptor<undefined>;
        /**
         * No proposal or bounty at that index.
         */
        InvalidIndex: PlainDescriptor<undefined>;
        /**
         * The reason given is just too big.
         */
        ReasonTooBig: PlainDescriptor<undefined>;
        /**
         * The bounty status is unexpected.
         */
        UnexpectedStatus: PlainDescriptor<undefined>;
        /**
         * Require bounty curator.
         */
        RequireCurator: PlainDescriptor<undefined>;
        /**
         * Invalid bounty value.
         */
        InvalidValue: PlainDescriptor<undefined>;
        /**
         * Invalid bounty fee.
         */
        InvalidFee: PlainDescriptor<undefined>;
        /**
         * A bounty payout is pending.
         * To cancel the bounty, you must unassign and slash the curator.
         */
        PendingPayout: PlainDescriptor<undefined>;
        /**
         * The bounties cannot be claimed/closed because it's still in the countdown period.
         */
        Premature: PlainDescriptor<undefined>;
        /**
         * The bounty cannot be closed because it has active child bounties.
         */
        HasActiveChildBounty: PlainDescriptor<undefined>;
        /**
         * Too many approvals are already queued.
         */
        TooManyQueued: PlainDescriptor<undefined>;
        /**
         * User is not the proposer of the bounty.
         */
        NotProposer: PlainDescriptor<undefined>;
    };
    ChildBounties: {
        /**
         * The parent bounty is not in active state.
         */
        ParentBountyNotActive: PlainDescriptor<undefined>;
        /**
         * The bounty balance is not enough to add new child-bounty.
         */
        InsufficientBountyBalance: PlainDescriptor<undefined>;
        /**
         * Number of child bounties exceeds limit `MaxActiveChildBountyCount`.
         */
        TooManyChildBounties: PlainDescriptor<undefined>;
    };
    AssetRate: {
        /**
         * The given asset ID is unknown.
         */
        UnknownAssetKind: PlainDescriptor<undefined>;
        /**
         * The given asset ID already has an assigned conversion rate and cannot be re-created.
         */
        AlreadyExists: PlainDescriptor<undefined>;
        /**
         * Overflow ocurred when calculating the inverse rate.
         */
        Overflow: PlainDescriptor<undefined>;
    };
    StateTrieMigration: {
        /**
         * Max signed limits not respected.
         */
        MaxSignedLimits: PlainDescriptor<undefined>;
        /**
         * A key was longer than the configured maximum.
         *
         * This means that the migration halted at the current [`Progress`] and
         * can be resumed with a larger [`crate::Config::MaxKeyLen`] value.
         * Retrying with the same [`crate::Config::MaxKeyLen`] value will not work.
         * The value should only be increased to avoid a storage migration for the currently
         * stored [`crate::Progress::LastKey`].
         */
        KeyTooLong: PlainDescriptor<undefined>;
        /**
         * submitter does not have enough funds.
         */
        NotEnoughFunds: PlainDescriptor<undefined>;
        /**
         * Bad witness data provided.
         */
        BadWitness: PlainDescriptor<undefined>;
        /**
         * Signed migration is not allowed because the maximum limit is not set yet.
         */
        SignedMigrationNotAllowed: PlainDescriptor<undefined>;
        /**
         * Bad child root provided.
         */
        BadChildRoot: PlainDescriptor<undefined>;
    };
    Staking: {
        /**
         * Not a controller account.
         */
        NotController: PlainDescriptor<undefined>;
        /**
         * Not a stash account.
         */
        NotStash: PlainDescriptor<undefined>;
        /**
         * Stash is already bonded.
         */
        AlreadyBonded: PlainDescriptor<undefined>;
        /**
         * Controller is already paired.
         */
        AlreadyPaired: PlainDescriptor<undefined>;
        /**
         * Targets cannot be empty.
         */
        EmptyTargets: PlainDescriptor<undefined>;
        /**
         * Duplicate index.
         */
        DuplicateIndex: PlainDescriptor<undefined>;
        /**
         * Slash record not found.
         */
        InvalidSlashRecord: PlainDescriptor<undefined>;
        /**
         * Cannot bond, nominate or validate with value less than the minimum defined by
         * governance (see `MinValidatorBond` and `MinNominatorBond`). If unbonding is the
         * intention, `chill` first to remove one's role as validator/nominator.
         */
        InsufficientBond: PlainDescriptor<undefined>;
        /**
         * Can not schedule more unlock chunks.
         */
        NoMoreChunks: PlainDescriptor<undefined>;
        /**
         * Can not rebond without unlocking chunks.
         */
        NoUnlockChunk: PlainDescriptor<undefined>;
        /**
         * Attempting to target a stash that still has funds.
         */
        FundedTarget: PlainDescriptor<undefined>;
        /**
         * Invalid era to reward.
         */
        InvalidEraToReward: PlainDescriptor<undefined>;
        /**
         * Invalid number of nominations.
         */
        InvalidNumberOfNominations: PlainDescriptor<undefined>;
        /**
         * Rewards for this era have already been claimed for this validator.
         */
        AlreadyClaimed: PlainDescriptor<undefined>;
        /**
         * No nominators exist on this page.
         */
        InvalidPage: PlainDescriptor<undefined>;
        /**
         * Incorrect previous history depth input provided.
         */
        IncorrectHistoryDepth: PlainDescriptor<undefined>;
        /**
         * Internal state has become somehow corrupted and the operation cannot continue.
         */
        BadState: PlainDescriptor<undefined>;
        /**
         * Too many nomination targets supplied.
         */
        TooManyTargets: PlainDescriptor<undefined>;
        /**
         * A nomination target was supplied that was blocked or otherwise not a validator.
         */
        BadTarget: PlainDescriptor<undefined>;
        /**
         * The user has enough bond and thus cannot be chilled forcefully by an external person.
         */
        CannotChillOther: PlainDescriptor<undefined>;
        /**
         * There are too many nominators in the system. Governance needs to adjust the staking
         * settings to keep things safe for the runtime.
         */
        TooManyNominators: PlainDescriptor<undefined>;
        /**
         * There are too many validator candidates in the system. Governance needs to adjust the
         * staking settings to keep things safe for the runtime.
         */
        TooManyValidators: PlainDescriptor<undefined>;
        /**
         * Commission is too low. Must be at least `MinCommission`.
         */
        CommissionTooLow: PlainDescriptor<undefined>;
        /**
         * Some bound is not met.
         */
        BoundNotMet: PlainDescriptor<undefined>;
        /**
         * Used when attempting to use deprecated controller account logic.
         */
        ControllerDeprecated: PlainDescriptor<undefined>;
        /**
         * Cannot reset a ledger.
         */
        CannotRestoreLedger: PlainDescriptor<undefined>;
        /**
         * Provided reward destination is not allowed.
         */
        RewardDestinationRestricted: PlainDescriptor<undefined>;
        /**
         * Not enough funds available to withdraw.
         */
        NotEnoughFunds: PlainDescriptor<undefined>;
        /**
         * Operation not allowed for virtual stakers.
         */
        VirtualStakerNotAllowed: PlainDescriptor<undefined>;
        /**
         * Stash could not be reaped as other pallet might depend on it.
         */
        CannotReapStash: PlainDescriptor<undefined>;
        /**
         * The stake of this account is already migrated to `Fungible` holds.
         */
        AlreadyMigrated: PlainDescriptor<undefined>;
        /**
         * Era not yet started.
         */
        EraNotStarted: PlainDescriptor<undefined>;
        /**
         * Account is restricted from participation in staking. This may happen if the account is
         * staking in another way already, such as via pool.
         */
        Restricted: PlainDescriptor<undefined>;
        /**
         * Unapplied slashes in the recently concluded era is blocking this operation.
         * See `Call::apply_slash` to apply them.
         */
        UnappliedSlashesInPreviousEra: PlainDescriptor<undefined>;
        /**
         * The era is not eligible for pruning.
         */
        EraNotPrunable: PlainDescriptor<undefined>;
        /**
         * The slash has been cancelled and cannot be applied.
         */
        CancelledSlash: PlainDescriptor<undefined>;
    };
    NominationPools: {
        /**
         * A (bonded) pool id does not exist.
         */
        PoolNotFound: PlainDescriptor<undefined>;
        /**
         * An account is not a member.
         */
        PoolMemberNotFound: PlainDescriptor<undefined>;
        /**
         * A reward pool does not exist. In all cases this is a system logic error.
         */
        RewardPoolNotFound: PlainDescriptor<undefined>;
        /**
         * A sub pool does not exist.
         */
        SubPoolsNotFound: PlainDescriptor<undefined>;
        /**
         * An account is already delegating in another pool. An account may only belong to one
         * pool at a time.
         */
        AccountBelongsToOtherPool: PlainDescriptor<undefined>;
        /**
         * The member is fully unbonded (and thus cannot access the bonded and reward pool
         * anymore to, for example, collect rewards).
         */
        FullyUnbonding: PlainDescriptor<undefined>;
        /**
         * The member cannot unbond further chunks due to reaching the limit.
         */
        MaxUnbondingLimit: PlainDescriptor<undefined>;
        /**
         * None of the funds can be withdrawn yet because the bonding duration has not passed.
         */
        CannotWithdrawAny: PlainDescriptor<undefined>;
        /**
         * The amount does not meet the minimum bond to either join or create a pool.
         *
         * The depositor can never unbond to a value less than `Pallet::depositor_min_bond`. The
         * caller does not have nominating permissions for the pool. Members can never unbond to a
         * value below `MinJoinBond`.
         */
        MinimumBondNotMet: PlainDescriptor<undefined>;
        /**
         * The transaction could not be executed due to overflow risk for the pool.
         */
        OverflowRisk: PlainDescriptor<undefined>;
        /**
         * A pool must be in [`PoolState::Destroying`] in order for the depositor to unbond or for
         * other members to be permissionlessly unbonded.
         */
        NotDestroying: PlainDescriptor<undefined>;
        /**
         * The caller does not have nominating permissions for the pool.
         */
        NotNominator: PlainDescriptor<undefined>;
        /**
         * Either a) the caller cannot make a valid kick or b) the pool is not destroying.
         */
        NotKickerOrDestroying: PlainDescriptor<undefined>;
        /**
         * The pool is not open to join
         */
        NotOpen: PlainDescriptor<undefined>;
        /**
         * The system is maxed out on pools.
         */
        MaxPools: PlainDescriptor<undefined>;
        /**
         * Too many members in the pool or system.
         */
        MaxPoolMembers: PlainDescriptor<undefined>;
        /**
         * The pools state cannot be changed.
         */
        CanNotChangeState: PlainDescriptor<undefined>;
        /**
         * The caller does not have adequate permissions.
         */
        DoesNotHavePermission: PlainDescriptor<undefined>;
        /**
         * Metadata exceeds [`Config::MaxMetadataLen`]
         */
        MetadataExceedsMaxLen: PlainDescriptor<undefined>;
        /**
         * Some error occurred that should never happen. This should be reported to the
         * maintainers.
         */
        Defensive: PlainDescriptor<Anonymize<Ie2db4l6126rkt>>;
        /**
         * Partial unbonding now allowed permissionlessly.
         */
        PartialUnbondNotAllowedPermissionlessly: PlainDescriptor<undefined>;
        /**
         * The pool's max commission cannot be set higher than the existing value.
         */
        MaxCommissionRestricted: PlainDescriptor<undefined>;
        /**
         * The supplied commission exceeds the max allowed commission.
         */
        CommissionExceedsMaximum: PlainDescriptor<undefined>;
        /**
         * The supplied commission exceeds global maximum commission.
         */
        CommissionExceedsGlobalMaximum: PlainDescriptor<undefined>;
        /**
         * Not enough blocks have surpassed since the last commission update.
         */
        CommissionChangeThrottled: PlainDescriptor<undefined>;
        /**
         * The submitted changes to commission change rate are not allowed.
         */
        CommissionChangeRateNotAllowed: PlainDescriptor<undefined>;
        /**
         * There is no pending commission to claim.
         */
        NoPendingCommission: PlainDescriptor<undefined>;
        /**
         * No commission current has been set.
         */
        NoCommissionCurrentSet: PlainDescriptor<undefined>;
        /**
         * Pool id currently in use.
         */
        PoolIdInUse: PlainDescriptor<undefined>;
        /**
         * Pool id provided is not correct/usable.
         */
        InvalidPoolId: PlainDescriptor<undefined>;
        /**
         * Bonding extra is restricted to the exact pending reward amount.
         */
        BondExtraRestricted: PlainDescriptor<undefined>;
        /**
         * No imbalance in the ED deposit for the pool.
         */
        NothingToAdjust: PlainDescriptor<undefined>;
        /**
         * No slash pending that can be applied to the member.
         */
        NothingToSlash: PlainDescriptor<undefined>;
        /**
         * The slash amount is too low to be applied.
         */
        SlashTooLow: PlainDescriptor<undefined>;
        /**
         * The pool or member delegation has already migrated to delegate stake.
         */
        AlreadyMigrated: PlainDescriptor<undefined>;
        /**
         * The pool or member delegation has not migrated yet to delegate stake.
         */
        NotMigrated: PlainDescriptor<undefined>;
        /**
         * This call is not allowed in the current state of the pallet.
         */
        NotSupported: PlainDescriptor<undefined>;
        /**
         * Account is restricted from participation in pools. This may happen if the account is
         * staking in another way already.
         */
        Restricted: PlainDescriptor<undefined>;
    };
    VoterList: {
        /**
         * A error in the list interface implementation.
         */
        List: PlainDescriptor<Anonymize<Ictkqqlhdjt761>>;
        /**
         * Could not update a node, because the pallet is locked.
         */
        Locked: PlainDescriptor<undefined>;
    };
    DelegatedStaking: {
        /**
         * The account cannot perform this operation.
         */
        NotAllowed: PlainDescriptor<undefined>;
        /**
         * An existing staker cannot perform this action.
         */
        AlreadyStaking: PlainDescriptor<undefined>;
        /**
         * Reward Destination cannot be same as `Agent` account.
         */
        InvalidRewardDestination: PlainDescriptor<undefined>;
        /**
         * Delegation conditions are not met.
         *
         * Possible issues are
         * 1) Cannot delegate to self,
         * 2) Cannot delegate to multiple delegates.
         */
        InvalidDelegation: PlainDescriptor<undefined>;
        /**
         * The account does not have enough funds to perform the operation.
         */
        NotEnoughFunds: PlainDescriptor<undefined>;
        /**
         * Not an existing `Agent` account.
         */
        NotAgent: PlainDescriptor<undefined>;
        /**
         * Not a Delegator account.
         */
        NotDelegator: PlainDescriptor<undefined>;
        /**
         * Some corruption in internal state.
         */
        BadState: PlainDescriptor<undefined>;
        /**
         * Unapplied pending slash restricts operation on `Agent`.
         */
        UnappliedSlash: PlainDescriptor<undefined>;
        /**
         * `Agent` has no pending slash to be applied.
         */
        NothingToSlash: PlainDescriptor<undefined>;
        /**
         * Failed to withdraw amount from Core Staking.
         */
        WithdrawFailed: PlainDescriptor<undefined>;
        /**
         * Operation not supported by this pallet.
         */
        NotSupported: PlainDescriptor<undefined>;
    };
    MultiBlockElection: {
        /**
         * Triggering the `Fallback` failed.
         */
        Fallback: PlainDescriptor<undefined>;
        /**
         * Unexpected phase
         */
        UnexpectedPhase: PlainDescriptor<undefined>;
        /**
         * Snapshot was unavailable.
         */
        Snapshot: PlainDescriptor<undefined>;
    };
    MultiBlockElectionSigned: {
        /**
         * The phase is not signed.
         */
        PhaseNotSigned: PlainDescriptor<undefined>;
        /**
         * The submission is a duplicate.
         */
        Duplicate: PlainDescriptor<undefined>;
        /**
         * The queue is full.
         */
        QueueFull: PlainDescriptor<undefined>;
        /**
         * The page index is out of bounds.
         */
        BadPageIndex: PlainDescriptor<undefined>;
        /**
         * The account is not registered.
         */
        NotRegistered: PlainDescriptor<undefined>;
        /**
         * No submission found.
         */
        NoSubmission: PlainDescriptor<undefined>;
        /**
         * Round is not yet over.
         */
        RoundNotOver: PlainDescriptor<undefined>;
        /**
         * Bad witness data provided.
         */
        BadWitnessData: PlainDescriptor<undefined>;
        /**
         * Too many invulnerable accounts are provided,
         */
        TooManyInvulnerables: PlainDescriptor<undefined>;
    };
    Sudo: {
        /**
         * Sender must be the Sudo account.
         */
        RequireSudo: PlainDescriptor<undefined>;
    };
    AhOps: {
        /**
         * Either no lease deposit or already unreserved.
         */
        NoLeaseReserve: PlainDescriptor<undefined>;
        /**
         * Either no crowdloan contribution or already withdrawn.
         */
        NoCrowdloanContribution: PlainDescriptor<undefined>;
        /**
         * Either no crowdloan reserve or already unreserved.
         */
        NoCrowdloanReserve: PlainDescriptor<undefined>;
        /**
         * Failed to withdraw crowdloan contribution.
         */
        FailedToWithdrawCrowdloanContribution: PlainDescriptor<undefined>;
        /**
         * Block number is not yet reached.
         */
        NotYet: PlainDescriptor<undefined>;
        /**
         * Not all contributions are withdrawn.
         */
        ContributionsRemaining: PlainDescriptor<undefined>;
        /**
         * The account is not a derived account.
         */
        WrongDerivedTranslation: PlainDescriptor<undefined>;
        /**
         * Account cannot be migrated since it is not a sovereign parachain account.
         */
        NotSovereign: PlainDescriptor<undefined>;
        /**
         * Internal error, please bug report.
         */
        InternalError: PlainDescriptor<undefined>;
        /**
         * The Asset Hub migration is not completed.
         */
        MigrationNotCompleted: PlainDescriptor<undefined>;
        /**
         * The balance is zero.
         */
        ZeroBalance: PlainDescriptor<undefined>;
    };
    AhMigrator: {
        /**
         * Failed to unreserve deposit.
         */
        FailedToUnreserveDeposit: PlainDescriptor<undefined>;
        /**
         * Failed to process an account data from RC.
         */
        FailedToProcessAccount: PlainDescriptor<undefined>;
        /**
         * Some item could not be inserted because it already exists.
         */
        InsertConflict: PlainDescriptor<undefined>;
        /**
         * Failed to convert RC type to AH type.
         */
        FailedToConvertType: PlainDescriptor<undefined>;
        /**
         * Failed to fetch preimage.
         */
        PreimageNotFound: PlainDescriptor<undefined>;
        /**
         * Failed to convert RC call to AH call.
         */
        FailedToConvertCall: PlainDescriptor<undefined>;
        /**
         * Failed to bound a call.
         */
        FailedToBoundCall: PlainDescriptor<undefined>;
        /**
         * Failed to send XCM message.
         */
        XcmError: PlainDescriptor<undefined>;
        /**
         * Failed to integrate a vesting schedule.
         */
        FailedToIntegrateVestingSchedule: PlainDescriptor<undefined>;
        /**
         * Checking account overflow or underflow.
         */
        FailedToCalculateCheckingAccount: PlainDescriptor<undefined>;
        /**
         * Vector did not fit into its compile-time bound.
         */
        FailedToBoundVector: PlainDescriptor<undefined>;
        /**
         * The DMP queue priority is already set to the same value.
         */
        DmpQueuePriorityAlreadySet: PlainDescriptor<undefined>;
        /**
         * Invalid parameter.
         */
        InvalidParameter: PlainDescriptor<undefined>;
        /**
         * Preimage missing.
         */
        PreimageMissing: PlainDescriptor<undefined>;
        /**
         * Preimage too big.
         */
        PreimageTooBig: PlainDescriptor<undefined>;
        /**
         * Preimage chunk missing.
         */
        PreimageChunkMissing: PlainDescriptor<undefined>;
        /**
         * Preimage status invalid.
         */
        PreimageStatusInvalid: PlainDescriptor<undefined>;
        /**
         * The XCM version is invalid.
         */
        BadXcmVersion: PlainDescriptor<undefined>;
        /**
         * The origin is invalid.
         */
        InvalidOrigin: PlainDescriptor<undefined>;
    };
};
type IConstants = {
    System: {
        /**
         * Block & extrinsics weights: base values and limits.
         */
        BlockWeights: PlainDescriptor<Anonymize<In7a38730s6qs>>;
        /**
         * The maximum length of a block (in bytes).
         */
        BlockLength: PlainDescriptor<Anonymize<If15el53dd76v9>>;
        /**
         * Maximum number of block number to block hash mappings to keep (oldest pruned first).
         */
        BlockHashCount: PlainDescriptor<number>;
        /**
         * The weight of runtime database operations the runtime can invoke.
         */
        DbWeight: PlainDescriptor<Anonymize<I9s0ave7t0vnrk>>;
        /**
         * Get the chain's in-code version.
         */
        Version: PlainDescriptor<Anonymize<I4fo08joqmcqnm>>;
        /**
         * The designated SS58 prefix of this chain.
         *
         * This replaces the "ss58Format" property declared in the chain spec. Reason is
         * that the runtime should know about the prefix in order to make use of it as
         * an identifier of the chain.
         */
        SS58Prefix: PlainDescriptor<number>;
    };
    ParachainSystem: {
        /**
         * Returns the parachain ID we are running with.
         */
        SelfParaId: PlainDescriptor<number>;
    };
    Timestamp: {
        /**
         * The minimum period between blocks.
         *
         * Be aware that this is different to the *expected* period that the block production
         * apparatus provides. Your chosen consensus system will generally work with this to
         * determine a sensible block time. For example, in the Aura pallet it will be double this
         * period on default settings.
         */
        MinimumPeriod: PlainDescriptor<bigint>;
    };
    Scheduler: {
        /**
         * The maximum weight that may be scheduled per block for any dispatchables.
         */
        MaximumWeight: PlainDescriptor<Anonymize<I4q39t5hn830vp>>;
        /**
         * The maximum number of scheduled calls in the queue for a single block.
         *
         * NOTE:
         * + Dependent pallets' benchmarks might require a higher limit for the setting. Set a
         * higher limit under `runtime-benchmarks` feature.
         */
        MaxScheduledPerBlock: PlainDescriptor<number>;
    };
    Balances: {
        /**
         * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
         *
         * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
         * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
         * In case you have multiple sources of provider references, you may also get unexpected
         * behaviour if you set this to zero.
         *
         * Bottom line: Do yourself a favour and make it at least one!
         */
        ExistentialDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum number of locks that should exist on an account.
         * Not strictly enforced, but used for weight estimation.
         *
         * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        MaxLocks: PlainDescriptor<number>;
        /**
         * The maximum number of named reserves that can exist on an account.
         *
         * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
         */
        MaxReserves: PlainDescriptor<number>;
        /**
         * The maximum number of individual freeze locks that can exist on an account at any time.
         */
        MaxFreezes: PlainDescriptor<number>;
    };
    TransactionPayment: {
        /**
         * A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
         * `priority`
         *
         * This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
         * added to a tip component in regular `priority` calculations.
         * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
         * extrinsic (with no tip), by including a tip value greater than the virtual tip.
         *
         * ```rust,ignore
         * // For `Normal`
         * let priority = priority_calc(tip);
         *
         * // For `Operational`
         * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
         * let priority = priority_calc(tip + virtual_tip);
         * ```
         *
         * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
         * sent with the transaction. So, not only does the transaction get a priority bump based
         * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
         * transactions.
         */
        OperationalFeeMultiplier: PlainDescriptor<number>;
    };
    Vesting: {
        /**
         * The minimum amount transferred to call `vested_transfer`.
         */
        MinVestedTransfer: PlainDescriptor<bigint>;
        /**
        
         */
        MaxVestingSchedules: PlainDescriptor<number>;
    };
    Claims: {
        /**
        
         */
        Prefix: PlainDescriptor<Binary>;
    };
    CollatorSelection: {
        /**
         * Account Identifier from which the internal Pot is generated.
         */
        PotId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * Maximum number of candidates that we should have.
         *
         * This does not take into account the invulnerables.
         */
        MaxCandidates: PlainDescriptor<number>;
        /**
         * Minimum number eligible collators. Should always be greater than zero. This includes
         * Invulnerable collators. This ensures that there will always be one collator who can
         * produce a block.
         */
        MinEligibleCollators: PlainDescriptor<number>;
        /**
         * Maximum number of invulnerables.
         */
        MaxInvulnerables: PlainDescriptor<number>;
        /**
        
         */
        KickThreshold: PlainDescriptor<number>;
        /**
         * Gets this pallet's derived pot account.
         */
        pot_account: PlainDescriptor<SS58String>;
    };
    Session: {
        /**
         * The amount to be held when setting keys.
         */
        KeyDeposit: PlainDescriptor<bigint>;
    };
    Aura: {
        /**
         * The slot duration Aura should run with, expressed in milliseconds.
         * The effective value of this type should not change while the chain is running.
         *
         * For backwards compatibility either use [`MinimumPeriodTimesTwo`] or a const.
         */
        SlotDuration: PlainDescriptor<bigint>;
    };
    XcmpQueue: {
        /**
         * The maximum number of inbound XCMP channels that can be suspended simultaneously.
         *
         * Any further channel suspensions will fail and messages may get dropped without further
         * notice. Choosing a high value (1000) is okay; the trade-off that is described in
         * [`InboundXcmpSuspended`] still applies at that scale.
         */
        MaxInboundSuspended: PlainDescriptor<number>;
        /**
         * Maximal number of outbound XCMP channels that can have messages queued at the same time.
         *
         * If this is reached, then no further messages can be sent to channels that do not yet
         * have a message queued. This should be set to the expected maximum of outbound channels
         * which is determined by [`Self::ChannelInfo`]. It is important to set this large enough,
         * since otherwise the congestion control protocol will not work as intended and messages
         * may be dropped. This value increases the PoV and should therefore not be picked too
         * high. Governance needs to pay attention to not open more channels than this value.
         */
        MaxActiveOutboundChannels: PlainDescriptor<number>;
        /**
         * The maximal page size for HRMP message pages.
         *
         * A lower limit can be set dynamically, but this is the hard-limit for the PoV worst case
         * benchmarking. The limit for the size of a message is slightly below this, since some
         * overhead is incurred for encoding the format.
         */
        MaxPageSize: PlainDescriptor<number>;
    };
    PolkadotXcm: {
        /**
         * This chain's Universal Location.
         */
        UniversalLocation: PlainDescriptor<XcmV5Junctions>;
        /**
         * The latest supported version that we advertise. Generally just set it to
         * `pallet_xcm::CurrentXcmVersion`.
         */
        AdvertisedXcmVersion: PlainDescriptor<number>;
        /**
         * The maximum number of local XCM locks that a single account may have.
         */
        MaxLockers: PlainDescriptor<number>;
        /**
         * The maximum number of consumers a single remote lock may have.
         */
        MaxRemoteLockConsumers: PlainDescriptor<number>;
    };
    MessageQueue: {
        /**
         * The size of the page; this implies the maximum message size which can be sent.
         *
         * A good value depends on the expected message sizes, their weights, the weight that is
         * available for processing them and the maximal needed message size. The maximal message
         * size is slightly lower than this as defined by [`MaxMessageLenOf`].
         */
        HeapSize: PlainDescriptor<number>;
        /**
         * The maximum number of stale pages (i.e. of overweight messages) allowed before culling
         * can happen. Once there are more stale pages than this, then historical pages may be
         * dropped, even if they contain unprocessed overweight messages.
         */
        MaxStale: PlainDescriptor<number>;
        /**
         * The amount of weight (if any) which should be provided to the message queue for
         * servicing enqueued items `on_initialize`.
         *
         * This may be legitimately `None` in the case that you will call
         * `ServiceQueues::service_queues` manually or set [`Self::IdleMaxServiceWeight`] to have
         * it run in `on_idle`.
         */
        ServiceWeight: PlainDescriptor<Anonymize<Iasb8k6ash5mjn>>;
        /**
         * The maximum amount of weight (if any) to be used from remaining weight `on_idle` which
         * should be provided to the message queue for servicing enqueued items `on_idle`.
         * Useful for parachains to process messages at the same block they are received.
         *
         * If `None`, it will not call `ServiceQueues::service_queues` in `on_idle`.
         */
        IdleMaxServiceWeight: PlainDescriptor<Anonymize<Iasb8k6ash5mjn>>;
    };
    Utility: {
        /**
         * The limit on the number of batched calls.
         */
        batched_calls_limit: PlainDescriptor<number>;
    };
    Multisig: {
        /**
         * The base amount of currency needed to reserve for creating a multisig execution or to
         * store a dispatch call for later.
         *
         * This is held for an additional storage item whose value size is
         * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
         * `32 + sizeof(AccountId)` bytes.
         */
        DepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per unit threshold when creating a multisig execution.
         *
         * This is held for adding 32 bytes more into a pre-existing storage value.
         */
        DepositFactor: PlainDescriptor<bigint>;
        /**
         * The maximum amount of signatories allowed in the multisig.
         */
        MaxSignatories: PlainDescriptor<number>;
    };
    Proxy: {
        /**
         * The base amount of currency needed to reserve for creating a proxy.
         *
         * This is held for an additional storage item whose value size is
         * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
         */
        ProxyDepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per proxy added.
         *
         * This is held for adding 32 bytes plus an instance of `ProxyType` more into a
         * pre-existing storage value. Thus, when configuring `ProxyDepositFactor` one should take
         * into account `32 + proxy_type.encode().len()` bytes of data.
         */
        ProxyDepositFactor: PlainDescriptor<bigint>;
        /**
         * The maximum amount of proxies allowed for a single account.
         */
        MaxProxies: PlainDescriptor<number>;
        /**
         * The maximum amount of time-delayed announcements that are allowed to be pending.
         */
        MaxPending: PlainDescriptor<number>;
        /**
         * The base amount of currency needed to reserve for creating an announcement.
         *
         * This is held when a new storage item holding a `Balance` is created (typically 16
         * bytes).
         */
        AnnouncementDepositBase: PlainDescriptor<bigint>;
        /**
         * The amount of currency needed per announcement made.
         *
         * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
         * into a pre-existing storage value.
         */
        AnnouncementDepositFactor: PlainDescriptor<bigint>;
    };
    Indices: {
        /**
         * The deposit needed for reserving an index.
         */
        Deposit: PlainDescriptor<bigint>;
    };
    Assets: {
        /**
         * Max number of items to destroy per `destroy_accounts` and `destroy_approvals` call.
         *
         * Must be configured to result in a weight that makes each call fit in a block.
         */
        RemoveItemsLimit: PlainDescriptor<number>;
        /**
         * The basic amount of funds that must be reserved for an asset.
         */
        AssetDeposit: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved for a non-provider asset account to be
         * maintained.
         */
        AssetAccountDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your asset.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes you store in your
         * metadata.
         */
        MetadataDepositPerByte: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved when creating a new approval.
         */
        ApprovalDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum length of a name or symbol stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
    };
    Uniques: {
        /**
         * The basic amount of funds that must be reserved for collection.
         */
        CollectionDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved for an item.
         */
        ItemDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your item.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding an attribute to an item.
         */
        AttributeDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes store in metadata,
         * either "normal" metadata or attribute metadata.
         */
        DepositPerByte: PlainDescriptor<bigint>;
        /**
         * The maximum length of data stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
        /**
         * The maximum length of an attribute key.
         */
        KeyLimit: PlainDescriptor<number>;
        /**
         * The maximum length of an attribute value.
         */
        ValueLimit: PlainDescriptor<number>;
    };
    Nfts: {
        /**
         * The basic amount of funds that must be reserved for collection.
         */
        CollectionDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved for an item.
         */
        ItemDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your item.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding an attribute to an item.
         */
        AttributeDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes store in metadata,
         * either "normal" metadata or attribute metadata.
         */
        DepositPerByte: PlainDescriptor<bigint>;
        /**
         * The maximum length of data stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
        /**
         * The maximum length of an attribute key.
         */
        KeyLimit: PlainDescriptor<number>;
        /**
         * The maximum length of an attribute value.
         */
        ValueLimit: PlainDescriptor<number>;
        /**
         * The maximum approvals an item could have.
         */
        ApprovalsLimit: PlainDescriptor<number>;
        /**
         * The maximum attributes approvals an item could have.
         */
        ItemAttributesApprovalsLimit: PlainDescriptor<number>;
        /**
         * The max number of tips a user could send.
         */
        MaxTips: PlainDescriptor<number>;
        /**
         * The max duration in blocks for deadlines.
         */
        MaxDeadlineDuration: PlainDescriptor<number>;
        /**
         * The max number of attributes a user could set per call.
         */
        MaxAttributesPerCall: PlainDescriptor<number>;
        /**
         * Disables some of pallet's features.
         */
        Features: PlainDescriptor<bigint>;
    };
    ForeignAssets: {
        /**
         * Max number of items to destroy per `destroy_accounts` and `destroy_approvals` call.
         *
         * Must be configured to result in a weight that makes each call fit in a block.
         */
        RemoveItemsLimit: PlainDescriptor<number>;
        /**
         * The basic amount of funds that must be reserved for an asset.
         */
        AssetDeposit: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved for a non-provider asset account to be
         * maintained.
         */
        AssetAccountDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your asset.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes you store in your
         * metadata.
         */
        MetadataDepositPerByte: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved when creating a new approval.
         */
        ApprovalDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum length of a name or symbol stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
    };
    PoolAssets: {
        /**
         * Max number of items to destroy per `destroy_accounts` and `destroy_approvals` call.
         *
         * Must be configured to result in a weight that makes each call fit in a block.
         */
        RemoveItemsLimit: PlainDescriptor<number>;
        /**
         * The basic amount of funds that must be reserved for an asset.
         */
        AssetDeposit: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved for a non-provider asset account to be
         * maintained.
         */
        AssetAccountDeposit: PlainDescriptor<bigint>;
        /**
         * The basic amount of funds that must be reserved when adding metadata to your asset.
         */
        MetadataDepositBase: PlainDescriptor<bigint>;
        /**
         * The additional funds that must be reserved for the number of bytes you store in your
         * metadata.
         */
        MetadataDepositPerByte: PlainDescriptor<bigint>;
        /**
         * The amount of funds that must be reserved when creating a new approval.
         */
        ApprovalDeposit: PlainDescriptor<bigint>;
        /**
         * The maximum length of a name or symbol stored on-chain.
         */
        StringLimit: PlainDescriptor<number>;
    };
    AssetConversion: {
        /**
         * A % the liquidity providers will take of every swap. Represents 10ths of a percent.
         */
        LPFee: PlainDescriptor<number>;
        /**
         * A one-time fee to setup the pool.
         */
        PoolSetupFee: PlainDescriptor<bigint>;
        /**
         * Asset class from [`Config::Assets`] used to pay the [`Config::PoolSetupFee`].
         */
        PoolSetupFeeAsset: PlainDescriptor<Anonymize<If9iqq7i64mur8>>;
        /**
         * A fee to withdraw the liquidity.
         */
        LiquidityWithdrawalFee: PlainDescriptor<number>;
        /**
         * The minimum LP token amount that could be minted. Ameliorates rounding errors.
         */
        MintMinLiquidity: PlainDescriptor<bigint>;
        /**
         * The max number of hops in a swap.
         */
        MaxSwapPathLength: PlainDescriptor<number>;
        /**
         * The pallet's id, used for deriving its sovereign account ID.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
    };
    Treasury: {
        /**
         * Period between successive spends.
         */
        SpendPeriod: PlainDescriptor<number>;
        /**
         * Percentage of spare funds (if any) that are burnt per spend period.
         */
        Burn: PlainDescriptor<number>;
        /**
         * The treasury's pallet id, used for deriving its sovereign account ID.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * DEPRECATED: associated with `spend_local` call and will be removed in May 2025.
         * Refer to <https://github.com/paritytech/polkadot-sdk/pull/5961> for migration to `spend`.
         *
         * The maximum number of approvals that can wait in the spending queue.
         *
         * NOTE: This parameter is also used within the Bounties Pallet extension if enabled.
         */
        MaxApprovals: PlainDescriptor<number>;
        /**
         * The period during which an approved treasury spend has to be claimed.
         */
        PayoutPeriod: PlainDescriptor<number>;
        /**
         * Gets this pallet's derived pot account.
         */
        pot_account: PlainDescriptor<SS58String>;
    };
    ConvictionVoting: {
        /**
         * The maximum number of concurrent votes an account may have.
         *
         * Also used to compute weight, an overly large value can lead to extrinsics with large
         * weight estimation: see `delegate` for instance.
         */
        MaxVotes: PlainDescriptor<number>;
        /**
         * The minimum period of vote locking.
         *
         * It should be no shorter than enactment period to ensure that in the case of an approval,
         * those successful voters are locked into the consequences that their votes entail.
         */
        VoteLockingPeriod: PlainDescriptor<number>;
    };
    Referenda: {
        /**
         * The minimum amount to be used as a deposit for a public referendum proposal.
         */
        SubmissionDeposit: PlainDescriptor<bigint>;
        /**
         * Maximum size of the referendum queue for a single track.
         */
        MaxQueued: PlainDescriptor<number>;
        /**
         * The number of blocks after submission that a referendum must begin being decided by.
         * Once this passes, then anyone may cancel the referendum.
         */
        UndecidingTimeout: PlainDescriptor<number>;
        /**
         * Quantization level for the referendum wakeup scheduler. A higher number will result in
         * fewer storage reads/writes needed for smaller voters, but also result in delays to the
         * automatic referendum status changes. Explicit servicing instructions are unaffected.
         */
        AlarmInterval: PlainDescriptor<number>;
        /**
         * A list of tracks.
         *
         * Note: if the tracks are dynamic, the value in the static metadata might be inaccurate.
         */
        Tracks: PlainDescriptor<Anonymize<Ibafpkl9hhno69>>;
    };
    Bounties: {
        /**
         * The amount held on deposit for placing a bounty proposal.
         */
        BountyDepositBase: PlainDescriptor<bigint>;
        /**
         * The delay period for which a bounty beneficiary need to wait before claim the payout.
         */
        BountyDepositPayoutDelay: PlainDescriptor<number>;
        /**
         * The time limit for a curator to act before a bounty expires.
         *
         * The period that starts when a curator is approved, during which they must execute or
         * update the bounty via `extend_bounty_expiry`. If missed, the bounty expires, and the
         * curator may be slashed. If `BlockNumberFor::MAX`, bounties stay active indefinitely,
         * removing the need for `extend_bounty_expiry`.
         */
        BountyUpdatePeriod: PlainDescriptor<number>;
        /**
         * The curator deposit is calculated as a percentage of the curator fee.
         *
         * This deposit has optional upper and lower bounds with `CuratorDepositMax` and
         * `CuratorDepositMin`.
         */
        CuratorDepositMultiplier: PlainDescriptor<number>;
        /**
         * Maximum amount of funds that should be placed in a deposit for making a proposal.
         */
        CuratorDepositMax: PlainDescriptor<Anonymize<I35p85j063s0il>>;
        /**
         * Minimum amount of funds that should be placed in a deposit for making a proposal.
         */
        CuratorDepositMin: PlainDescriptor<Anonymize<I35p85j063s0il>>;
        /**
         * Minimum value for a bounty.
         */
        BountyValueMinimum: PlainDescriptor<bigint>;
        /**
         * The amount held on deposit per byte within the tip report reason or bounty description.
         */
        DataDepositPerByte: PlainDescriptor<bigint>;
        /**
         * Maximum acceptable reason length.
         *
         * Benchmarks depend on this value, be sure to update weights file when changing this value
         */
        MaximumReasonLength: PlainDescriptor<number>;
    };
    ChildBounties: {
        /**
         * Maximum number of child bounties that can be added to a parent bounty.
         */
        MaxActiveChildBountyCount: PlainDescriptor<number>;
        /**
         * Minimum value for a child-bounty.
         */
        ChildBountyValueMinimum: PlainDescriptor<bigint>;
    };
    StateTrieMigration: {
        /**
         * Maximal number of bytes that a key can have.
         *
         * FRAME itself does not limit the key length.
         * The concrete value must therefore depend on your storage usage.
         * A [`frame_support::storage::StorageNMap`] for example can have an arbitrary number of
         * keys which are then hashed and concatenated, resulting in arbitrarily long keys.
         *
         * Use the *state migration RPC* to retrieve the length of the longest key in your
         * storage: <https://github.com/paritytech/substrate/issues/11642>
         *
         * The migration will halt with a `Halted` event if this value is too small.
         * Since there is no real penalty from over-estimating, it is advised to use a large
         * value. The default is 512 byte.
         *
         * Some key lengths for reference:
         * - [`frame_support::storage::StorageValue`]: 32 byte
         * - [`frame_support::storage::StorageMap`]: 64 byte
         * - [`frame_support::storage::StorageDoubleMap`]: 96 byte
         *
         * For more info see
         * <https://www.shawntabrizi.com/blog/substrate/querying-substrate-storage-via-rpc/>
         */
        MaxKeyLen: PlainDescriptor<number>;
    };
    Staking: {
        /**
         * Number of eras to keep in history.
         *
         * Following information is kept for eras in `[current_era -
         * HistoryDepth, current_era]`: `ErasValidatorPrefs`, `ErasValidatorReward`,
         * `ErasRewardPoints`, `ErasTotalStake`, `ClaimedRewards`,
         * `ErasStakersPaged`, `ErasStakersOverview`.
         *
         * Must be more than the number of eras delayed by session.
         * I.e. active era must always be in history. I.e. `active_era >
         * current_era - history_depth` must be guaranteed.
         *
         * If migrating an existing pallet from storage value to config value,
         * this should be set to same value or greater as in storage.
         */
        HistoryDepth: PlainDescriptor<number>;
        /**
         * Number of sessions per era, as per the preferences of the **relay chain**.
         */
        SessionsPerEra: PlainDescriptor<number>;
        /**
         * Number of sessions before the end of an era when the election for the next era will
         * start.
         *
         * - This determines how many sessions **before** the last session of the era the staking
         * election process should begin.
         * - The value is bounded between **1** (election starts at the beginning of the last
         * session) and `SessionsPerEra` (election starts at the beginning of the first session
         * of the era).
         *
         * ### Example:
         * - If `SessionsPerEra = 6` and `PlanningEraOffset = 1`, the election starts at the
         * beginning of session `6 - 1 = 5`.
         * - If `PlanningEraOffset = 6`, the election starts at the beginning of session `6 - 6 =
         * 0`, meaning it starts at the very beginning of the era.
         */
        PlanningEraOffset: PlainDescriptor<number>;
        /**
         * Number of eras that staked funds must remain bonded for.
         */
        BondingDuration: PlainDescriptor<number>;
        /**
         * Number of eras that slashes are deferred by, after computation.
         *
         * This should be less than the bonding duration. Set to 0 if slashes
         * should be applied immediately, without opportunity for intervention.
         */
        SlashDeferDuration: PlainDescriptor<number>;
        /**
         * The maximum size of each `T::ExposurePage`.
         *
         * An `ExposurePage` is weakly bounded to a maximum of `MaxExposurePageSize`
         * nominators.
         *
         * For older non-paged exposure, a reward payout was restricted to the top
         * `MaxExposurePageSize` nominators. This is to limit the i/o cost for the
         * nominator payout.
         *
         * Note: `MaxExposurePageSize` is used to bound `ClaimedRewards` and is unsafe to
         * reduce without handling it in a migration.
         */
        MaxExposurePageSize: PlainDescriptor<number>;
        /**
         * The absolute maximum of winner validators this pallet should return.
         *
         * As this pallet supports multi-block election, the set of winner validators *per
         * election* is bounded by this type.
         */
        MaxValidatorSet: PlainDescriptor<number>;
        /**
         * The maximum number of `unlocking` chunks a [`StakingLedger`] can
         * have. Effectively determines how many unique eras a staker may be
         * unbonding in.
         *
         * Note: `MaxUnlockingChunks` is used as the upper bound for the
         * `BoundedVec` item `StakingLedger.unlocking`. Setting this value
         * lower than the existing value can lead to inconsistencies in the
         * `StakingLedger` and will need to be handled properly in a runtime
         * migration. The test `reducing_max_unlocking_chunks_abrupt` shows
         * this effect.
         */
        MaxUnlockingChunks: PlainDescriptor<number>;
        /**
         * Maximum number of invulnerable validators.
         */
        MaxInvulnerables: PlainDescriptor<number>;
        /**
         * Maximum allowed era duration in milliseconds.
         *
         * This provides a defensive upper bound to cap the effective era duration, preventing
         * excessively long eras from causing runaway inflation (e.g., due to bugs). If the actual
         * era duration exceeds this value, it will be clamped to this maximum.
         *
         * Example: For an ideal era duration of 24 hours (86,400,000 ms),
         * this can be set to 604,800,000 ms (7 days).
         */
        MaxEraDuration: PlainDescriptor<bigint>;
        /**
         * Maximum number of storage items that can be pruned in a single call.
         *
         * This controls how many storage items can be deleted in each call to `prune_era_step`.
         * This should be set to a conservative value (e.g., 100-500 items) to ensure pruning
         * doesn't consume too much block space. The actual weight is determined by benchmarks.
         */
        MaxPruningItems: PlainDescriptor<number>;
    };
    NominationPools: {
        /**
         * The nomination pool's pallet id.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * The maximum pool points-to-balance ratio that an `open` pool can have.
         *
         * This is important in the event slashing takes place and the pool's points-to-balance
         * ratio becomes disproportional.
         *
         * Moreover, this relates to the `RewardCounter` type as well, as the arithmetic operations
         * are a function of number of points, and by setting this value to e.g. 10, you ensure
         * that the total number of points in the system are at most 10 times the total_issuance of
         * the chain, in the absolute worse case.
         *
         * For a value of 10, the threshold would be a pool points-to-balance ratio of 10:1.
         * Such a scenario would also be the equivalent of the pool being 90% slashed.
         */
        MaxPointsToBalance: PlainDescriptor<number>;
        /**
         * The maximum number of simultaneous unbonding chunks that can exist per member.
         */
        MaxUnbonding: PlainDescriptor<number>;
    };
    VoterList: {
        /**
         * The list of thresholds separating the various bags.
         *
         * Ids are separated into unsorted bags according to their score. This specifies the
         * thresholds separating the bags. An id's bag is the largest bag for which the id's score
         * is less than or equal to its upper threshold.
         *
         * When ids are iterated, higher bags are iterated completely before lower bags. This means
         * that iteration is _semi-sorted_: ids of higher score tend to come before ids of lower
         * score, but peer ids within a particular bag are sorted in insertion order.
         *
         * # Expressing the constant
         *
         * This constant must be sorted in strictly increasing order. Duplicate items are not
         * permitted.
         *
         * There is an implied upper limit of `Score::MAX`; that value does not need to be
         * specified within the bag. For any two threshold lists, if one ends with
         * `Score::MAX`, the other one does not, and they are otherwise equal, the two
         * lists will behave identically.
         *
         * # Calculation
         *
         * It is recommended to generate the set of thresholds in a geometric series, such that
         * there exists some constant ratio such that `threshold[k + 1] == (threshold[k] *
         * constant_ratio).max(threshold[k] + 1)` for all `k`.
         *
         * The helpers in the `/utils/frame/generate-bags` module can simplify this calculation.
         *
         * # Examples
         *
         * - If `BagThresholds::get().is_empty()`, then all ids are put into the same bag, and
         * iteration is strictly in insertion order.
         * - If `BagThresholds::get().len() == 64`, and the thresholds are determined according to
         * the procedure given above, then the constant ratio is equal to 2.
         * - If `BagThresholds::get().len() == 200`, and the thresholds are determined according to
         * the procedure given above, then the constant ratio is approximately equal to 1.248.
         * - If the threshold list begins `[1, 2, 3, ...]`, then an id with score 0 or 1 will fall
         * into bag 0, an id with score 2 will fall into bag 1, etc.
         *
         * # Migration
         *
         * In the event that this list ever changes, a copy of the old bags list must be retained.
         * With that `List::migrate` can be called, which will perform the appropriate migration.
         */
        BagThresholds: PlainDescriptor<Anonymize<Iafqnechp3omqg>>;
        /**
         * Maximum number of accounts that may be re-bagged automatically in `on_idle`.
         *
         * A value of `0` (obtained by configuring `type MaxAutoRebagPerBlock = ();`) disables
         * the feature.
         */
        MaxAutoRebagPerBlock: PlainDescriptor<number>;
    };
    DelegatedStaking: {
        /**
         * Injected identifier for the pallet.
         */
        PalletId: PlainDescriptor<FixedSizeBinary<8>>;
        /**
         * Fraction of the slash that is rewarded to the caller of pending slash to the agent.
         */
        SlashRewardFraction: PlainDescriptor<number>;
    };
    MultiBlockElection: {
        /**
         * Duration of the unsigned phase.
         */
        UnsignedPhase: PlainDescriptor<number>;
        /**
         * Duration of the signed phase.
         */
        SignedPhase: PlainDescriptor<number>;
        /**
         * Duration of the singed validation phase.
         *
         * The duration of this should not be less than `T::Pages`, and there is no point in it
         * being more than `SignedPhase::MaxSubmission::get() * T::Pages`. TODO: integrity test for
         * it.
         */
        SignedValidationPhase: PlainDescriptor<number>;
        /**
         * The number of snapshot voters to fetch per block.
         */
        VoterSnapshotPerBlock: PlainDescriptor<number>;
        /**
         * The number of snapshot targets to fetch per block.
         */
        TargetSnapshotPerBlock: PlainDescriptor<number>;
        /**
         * The number of pages.
         *
         * The snapshot is created with this many keys in the storage map.
         *
         * The solutions may contain at MOST this many pages, but less pages are acceptable as
         * well.
         */
        Pages: PlainDescriptor<number>;
    };
    MultiBlockElectionVerifier: {
        /**
         * The minimum amount of improvement to the solution score that defines a solution as
         * "better".
         */
        SolutionImprovementThreshold: PlainDescriptor<number>;
        /**
         * Maximum number of backers, per winner, among all pages of an election.
         *
         * This can only be checked at the very final step of verification.
         *
         * NOTE: at the moment, we don't check this, and it is in place for future compatibility.
         */
        MaxBackersPerWinnerFinal: PlainDescriptor<number>;
        /**
         * Maximum number of backers, per winner, per page.
         */
        MaxBackersPerWinner: PlainDescriptor<number>;
        /**
         * Maximum number of supports (aka. winners/validators/targets) that can be represented in
         * a page of results.
         */
        MaxWinnersPerPage: PlainDescriptor<number>;
    };
};
type IViewFns = {
    Proxy: {
        /**
         * Check if a `RuntimeCall` is allowed for a given `ProxyType`.
         */
        check_permissions: RuntimeDescriptor<[call: Anonymize<Ic7pvaiu1ha8ek>, proxy_type: Anonymize<I796241kr7j1j0>], boolean>;
        /**
         * Check if one `ProxyType` is a subset of another `ProxyType`.
         */
        is_superset: RuntimeDescriptor<[to_check: Anonymize<I796241kr7j1j0>, against: Anonymize<I796241kr7j1j0>], boolean>;
    };
    VoterList: {
        /**
         * Get the current `score` of a given account.
         *
         * Returns `(current, real_score)`, the former being the current score that this pallet is
         * aware of, which may or may not be up to date, and the latter being the real score, as
         * provided by
         *
         * If the two differ, it means this node is eligible for [`Call::rebag`].
         */
        scores: RuntimeDescriptor<[who: SS58String], Anonymize<Iba6ec6u9n2dc1>>;
    };
    MultiBlockElectionSigned: {
        /**
         * Get the deposit amount that will be held for a solution of `pages`.
         *
         * This allows an offchain application to know what [`Config::DepositPerPage`] and
         * [`Config::DepositBase`] are doing under the hood. It also takes into account if `who` is
         * [`Invulnerables`] or not.
         */
        deposit_for: RuntimeDescriptor<[who: SS58String, pages: number], bigint>;
    };
};
type IRuntimeCalls = {
    /**
     * API necessary for block authorship with aura.
     */
    AuraApi: {
        /**
         * Returns the slot duration for Aura.
         *
         * Currently, only the value provided by this type at genesis will be used.
         */
        slot_duration: RuntimeDescriptor<[], bigint>;
        /**
         * Return the current set of authorities.
         */
        authorities: RuntimeDescriptor<[], Anonymize<Ic5m5lp1oioo8r>>;
    };
    /**
     * API to tell the node side how the relay parent should be chosen.
     *
     * A larger offset indicates that the relay parent should not be the tip of the relay chain,
     * but `N` blocks behind the tip. This offset is then enforced by the runtime.
     */
    RelayParentOffsetApi: {
        /**
         * Fetch the slot offset that is expected from the relay chain.
         */
        relay_parent_offset: RuntimeDescriptor<[], number>;
    };
    /**
     * This runtime API is used to inform potential block authors whether they will
     * have the right to author at a slot, assuming they have claimed the slot.
     *
     * In particular, this API allows Aura-based parachains to regulate their "unincluded segment",
     * which is the section of the head of the chain which has not yet been made available in the
     * relay chain.
     *
     * When the unincluded segment is short, Aura chains will allow authors to create multiple
     * blocks per slot in order to build a backlog. When it is saturated, this API will limit
     * the amount of blocks that can be created.
     *
     * Changes:
     * - Version 2: Update to `can_build_upon` to take a relay chain `Slot` instead of a parachain `Slot`.
     */
    AuraUnincludedSegmentApi: {
        /**
         * Whether it is legal to extend the chain, assuming the given block is the most
         * recently included one as-of the relay parent that will be built against, and
         * the given relay chain slot.
         *
         * This should be consistent with the logic the runtime uses when validating blocks to
         * avoid issues.
         *
         * When the unincluded segment is empty, i.e. `included_hash == at`, where at is the block
         * whose state we are querying against, this must always return `true` as long as the slot
         * is more recent than the included block itself.
         */
        can_build_upon: RuntimeDescriptor<[included_hash: FixedSizeBinary<32>, slot: bigint], boolean>;
    };
    /**
     * The `Core` runtime api that every Substrate runtime needs to implement.
     */
    Core: {
        /**
         * Returns the version of the runtime.
         */
        version: RuntimeDescriptor<[], Anonymize<I4fo08joqmcqnm>>;
        /**
         * Execute the given block.
         */
        execute_block: RuntimeDescriptor<[block: Anonymize<Iaqet9jc3ihboe>], undefined>;
        /**
         * Initialize a block with the given header and return the runtime executive mode.
         */
        initialize_block: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], Anonymize<I2v50gu3s1aqk6>>;
    };
    /**
     * The `Metadata` api trait that returns metadata for the runtime.
     */
    Metadata: {
        /**
         * Returns the metadata of a runtime.
         */
        metadata: RuntimeDescriptor<[], Binary>;
        /**
         * Returns the metadata at a given version.
         *
         * If the given `version` isn't supported, this will return `None`.
         * Use [`Self::metadata_versions`] to find out about supported metadata version of the runtime.
         */
        metadata_at_version: RuntimeDescriptor<[version: number], Anonymize<Iabpgqcjikia83>>;
        /**
         * Returns the supported metadata versions.
         *
         * This can be used to call `metadata_at_version`.
         */
        metadata_versions: RuntimeDescriptor<[], Anonymize<Icgljjb6j82uhn>>;
    };
    /**
     * The `BlockBuilder` api trait that provides the required functionality for building a block.
     */
    BlockBuilder: {
        /**
         * Apply the given extrinsic.
         *
         * Returns an inclusion outcome which specifies if this extrinsic is included in
         * this block or not.
         */
        apply_extrinsic: RuntimeDescriptor<[extrinsic: Binary], Anonymize<Ib13rjfu0u56k0>>;
        /**
         * Finish the current block.
         */
        finalize_block: RuntimeDescriptor<[], Anonymize<Ic952bubvq4k7d>>;
        /**
         * Generate inherent extrinsics. The inherent data will vary from chain to chain.
         */
        inherent_extrinsics: RuntimeDescriptor<[inherent: Anonymize<If7uv525tdvv7a>], Anonymize<Itom7fk49o0c9>>;
        /**
         * Check that the inherents are valid. The inherent data will vary from chain to chain.
         */
        check_inherents: RuntimeDescriptor<[block: Anonymize<Iaqet9jc3ihboe>, data: Anonymize<If7uv525tdvv7a>], Anonymize<I2an1fs2eiebjp>>;
    };
    /**
     * The `TaggedTransactionQueue` api trait for interfering with the transaction queue.
     */
    TaggedTransactionQueue: {
        /**
         * Validate the transaction.
         *
         * This method is invoked by the transaction pool to learn details about given transaction.
         * The implementation should make sure to verify the correctness of the transaction
         * against current state. The given `block_hash` corresponds to the hash of the block
         * that is used as current state.
         *
         * Note that this call may be performed by the pool multiple times and transactions
         * might be verified in any possible order.
         */
        validate_transaction: RuntimeDescriptor<[source: TransactionValidityTransactionSource, tx: Binary, block_hash: FixedSizeBinary<32>], Anonymize<I9ask1o4tfvcvs>>;
    };
    /**
     * The offchain worker api.
     */
    OffchainWorkerApi: {
        /**
         * Starts the off-chain task for given block header.
         */
        offchain_worker: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], undefined>;
    };
    /**
     * Session keys runtime api.
     */
    SessionKeys: {
        /**
         * Generate a set of session keys with optionally using the given seed.
         * The keys should be stored within the keystore exposed via runtime
         * externalities.
         *
         * The seed needs to be a valid `utf8` string.
         *
         * Returns the concatenated SCALE encoded public keys.
         */
        generate_session_keys: RuntimeDescriptor<[seed: Anonymize<Iabpgqcjikia83>], Binary>;
        /**
         * Decode the given public session keys.
         *
         * Returns the list of public raw public keys + key type.
         */
        decode_session_keys: RuntimeDescriptor<[encoded: Binary], Anonymize<Icerf8h8pdu8ss>>;
    };
    /**
     * The API to query account nonce.
     */
    AccountNonceApi: {
        /**
         * Get current account nonce of given `AccountId`.
         */
        account_nonce: RuntimeDescriptor<[account: SS58String], number>;
    };
    /**
    
     */
    TransactionPaymentApi: {
        /**
        
         */
        query_info: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<I6spmpef2c7svf>>;
        /**
        
         */
        query_fee_details: RuntimeDescriptor<[uxt: Binary, len: number], Anonymize<Iei2mvq0mjvt81>>;
        /**
        
         */
        query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>;
        /**
        
         */
        query_length_to_fee: RuntimeDescriptor<[length: number], bigint>;
    };
    /**
    
     */
    TransactionPaymentCallApi: {
        /**
         * Query information of a dispatch class, weight, and fee of a given encoded `Call`.
         */
        query_call_info: RuntimeDescriptor<[call: Anonymize<Ic7pvaiu1ha8ek>, len: number], Anonymize<I6spmpef2c7svf>>;
        /**
         * Query fee details of a given encoded `Call`.
         */
        query_call_fee_details: RuntimeDescriptor<[call: Anonymize<Ic7pvaiu1ha8ek>, len: number], Anonymize<Iei2mvq0mjvt81>>;
        /**
         * Query the output of the current `WeightToFee` given some input.
         */
        query_weight_to_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>], bigint>;
        /**
         * Query the output of the current `LengthToFee` given some input.
         */
        query_length_to_fee: RuntimeDescriptor<[length: number], bigint>;
    };
    /**
     * A trait of XCM payment API.
     *
     * API provides functionality for obtaining:
     *
     * * the weight required to execute an XCM message,
     * * a list of acceptable `AssetId`s for message execution payment,
     * * the cost of the weight in the specified acceptable `AssetId`.
     * * the fees for an XCM message delivery.
     *
     * To determine the execution weight of the calls required for
     * [`xcm::latest::Instruction::Transact`] instruction, `TransactionPaymentCallApi` can be used.
     */
    XcmPaymentApi: {
        /**
         * Returns a list of acceptable payment assets.
         *
         * # Arguments
         *
         * * `xcm_version`: Version.
         */
        query_acceptable_payment_assets: RuntimeDescriptor<[xcm_version: number], Anonymize<Iftvbctbo05fu4>>;
        /**
         * Returns a weight needed to execute a XCM.
         *
         * # Arguments
         *
         * * `message`: `VersionedXcm`.
         */
        query_xcm_weight: RuntimeDescriptor<[message: XcmVersionedXcm], Anonymize<Ic0c3req3mlc1l>>;
        /**
         * Converts a weight into a fee for the specified `AssetId`.
         *
         * # Arguments
         *
         * * `weight`: convertible `Weight`.
         * * `asset`: `VersionedAssetId`.
         */
        query_weight_to_asset_fee: RuntimeDescriptor<[weight: Anonymize<I4q39t5hn830vp>, asset: XcmVersionedAssetId], Anonymize<I7ocn4njqde3v5>>;
        /**
         * Get delivery fees for sending a specific `message` to a `destination`.
         * These always come in a specific asset, defined by the chain.
         *
         * # Arguments
         * * `message`: The message that'll be sent, necessary because most delivery fees are based on the
         * size of the message.
         * * `destination`: The destination to send the message to. Different destinations may use
         * different senders that charge different fees.
         */
        query_delivery_fees: RuntimeDescriptor<[destination: XcmVersionedLocation, message: XcmVersionedXcm], Anonymize<Iek7ha36da9mf5>>;
    };
    /**
     * API for dry-running extrinsics and XCM programs to get the programs that need to be passed to the fees API.
     *
     * All calls return a vector of tuples (location, xcm) where each "xcm" is executed in "location".
     * If there's local execution, the location will be "Here".
     * This vector can be used to calculate both execution and delivery fees.
     *
     * Calls or XCMs might fail when executed, this doesn't mean the result of these calls will be an `Err`.
     * In those cases, there might still be a valid result, with the execution error inside it.
     * The only reasons why these calls might return an error are listed in the [`Error`] enum.
     */
    DryRunApi: {
        /**
         * Dry run call V2.
         */
        dry_run_call: RuntimeDescriptor<[origin: Anonymize<I9mrsespe1jciv>, call: Anonymize<Ic7pvaiu1ha8ek>, result_xcms_version: number], Anonymize<I3f0ffdeaqo2ss>>;
        /**
         * Dry run XCM program
         */
        dry_run_xcm: RuntimeDescriptor<[origin_location: XcmVersionedLocation, xcm: XcmVersionedXcm], Anonymize<I6vpoc9mh7av70>>;
    };
    /**
     * API for useful conversions between XCM `Location` and `AccountId`.
     */
    LocationToAccountApi: {
        /**
         * Converts `Location` to `AccountId`.
         */
        convert_location: RuntimeDescriptor<[location: XcmVersionedLocation], Anonymize<Ieh6nis3hdbtgi>>;
    };
    /**
     * API for querying trusted reserves and trusted teleporters.
     */
    TrustedQueryApi: {
        /**
         * Returns if the location is a trusted reserve for the asset.
         *
         * # Arguments
         * * `asset`: `VersionedAsset`.
         * * `location`: `VersionedLocation`.
         */
        is_trusted_reserve: RuntimeDescriptor<[asset: XcmVersionedAsset, location: XcmVersionedLocation], Anonymize<Icujp6hmv35vbn>>;
        /**
         * Returns if the asset can be teleported to the location.
         *
         * # Arguments
         * * `asset`: `VersionedAsset`.
         * * `location`: `VersionedLocation`.
         */
        is_trusted_teleporter: RuntimeDescriptor<[asset: XcmVersionedAsset, location: XcmVersionedLocation], Anonymize<Icujp6hmv35vbn>>;
    };
    /**
     * API for querying XCM authorized aliases
     */
    AuthorizedAliasersApi: {
        /**
         * Returns locations allowed to alias into and act as `target`.
         */
        authorized_aliasers: RuntimeDescriptor<[target: XcmVersionedLocation], Anonymize<I4tjame31218k9>>;
        /**
         * Returns whether `origin` is allowed to alias into and act as `target`.
         */
        is_authorized_alias: RuntimeDescriptor<[origin: XcmVersionedLocation, target: XcmVersionedLocation], Anonymize<I5gif8vomct5i8>>;
    };
    /**
     * The API for querying account's balances from runtime.
     */
    FungiblesApi: {
        /**
         * Returns the list of all [`Asset`] that an `AccountId` has.
         */
        query_account_balances: RuntimeDescriptor<[account: SS58String], Anonymize<I8fk5filgollou>>;
    };
    /**
     * Runtime api to collect information about a collation.
     *
     * Version history:
     * - Version 2: Changed [`Self::collect_collation_info`] signature
     * - Version 3: Signals to the node to use version 1 of [`ParachainBlockData`].
     */
    CollectCollationInfo: {
        /**
         * Collect information about a collation.
         *
         * The given `header` is the header of the built block for that
         * we are collecting the collation info for.
         */
        collect_collation_info: RuntimeDescriptor<[header: Anonymize<Ic952bubvq4k7d>], Anonymize<Ic1d4u2opv3fst>>;
    };
    /**
     * API to interact with `RuntimeGenesisConfig` for the runtime
     */
    GenesisBuilder: {
        /**
         * Build `RuntimeGenesisConfig` from a JSON blob not using any defaults and store it in the
         * storage.
         *
         * In the case of a FRAME-based runtime, this function deserializes the full
         * `RuntimeGenesisConfig` from the given JSON blob and puts it into the storage. If the
         * provided JSON blob is incorrect or incomplete or the deserialization fails, an error
         * is returned.
         *
         * Please note that provided JSON blob must contain all `RuntimeGenesisConfig` fields, no
         * defaults will be used.
         */
        build_state: RuntimeDescriptor<[json: Binary], Anonymize<Ie9sr1iqcg3cgm>>;
        /**
         * Returns a JSON blob representation of the built-in `RuntimeGenesisConfig` identified by
         * `id`.
         *
         * If `id` is `None` the function should return JSON blob representation of the default
         * `RuntimeGenesisConfig` struct of the runtime. Implementation must provide default
         * `RuntimeGenesisConfig`.
         *
         * Otherwise function returns a JSON representation of the built-in, named
         * `RuntimeGenesisConfig` preset identified by `id`, or `None` if such preset does not
         * exist. Returned `Vec<u8>` contains bytes of JSON blob (patch) which comprises a list of
         * (potentially nested) key-value pairs that are intended for customizing the default
         * runtime genesis config. The patch shall be merged (rfc7386) with the JSON representation
         * of the default `RuntimeGenesisConfig` to create a comprehensive genesis config that can
         * be used in `build_state` method.
         */
        get_preset: RuntimeDescriptor<[id: Anonymize<I1mqgk2tmnn9i2>], Anonymize<Iabpgqcjikia83>>;
        /**
         * Returns a list of identifiers for available builtin `RuntimeGenesisConfig` presets.
         *
         * The presets from the list can be queried with [`GenesisBuilder::get_preset`] method. If
         * no named presets are provided by the runtime the list is empty.
         */
        preset_names: RuntimeDescriptor<[], Anonymize<I6lr8sctk0bi4e>>;
    };
    /**
     * This runtime api allows people to query the size of the liquidity pools
     * and quote prices for swaps.
     */
    AssetConversionApi: {
        /**
         * Provides a quote for [`Pallet::swap_tokens_for_exact_tokens`].
         *
         * Note that the price may have changed by the time the transaction is executed.
         * (Use `amount_in_max` to control slippage.)
         */
        quote_price_tokens_for_exact_tokens: RuntimeDescriptor<[asset1: Anonymize<If9iqq7i64mur8>, asset2: Anonymize<If9iqq7i64mur8>, amount: bigint, include_fee: boolean], Anonymize<I35p85j063s0il>>;
        /**
         * Provides a quote for [`Pallet::swap_exact_tokens_for_tokens`].
         *
         * Note that the price may have changed by the time the transaction is executed.
         * (Use `amount_out_min` to control slippage.)
         */
        quote_price_exact_tokens_for_tokens: RuntimeDescriptor<[asset1: Anonymize<If9iqq7i64mur8>, asset2: Anonymize<If9iqq7i64mur8>, amount: bigint, include_fee: boolean], Anonymize<I35p85j063s0il>>;
        /**
         * Returns the size of the liquidity pool for the given asset pair.
         */
        get_reserves: RuntimeDescriptor<[asset1: Anonymize<If9iqq7i64mur8>, asset2: Anonymize<If9iqq7i64mur8>], Anonymize<I5vv5n03oo8gas>>;
    };
    /**
     * Runtime api used to access general info about a parachain runtime.
     */
    GetParachainInfo: {
        /**
         * Retrieve the parachain id used for runtime.
         */
        parachain_id: RuntimeDescriptor<[], number>;
    };
    /**
     * Runtime api for accessing information about nomination pools.
     */
    NominationPoolsApi: {
        /**
         * Returns the pending rewards for the member that the AccountId was given for.
         */
        pending_rewards: RuntimeDescriptor<[who: SS58String], bigint>;
        /**
         * Returns the equivalent balance of `points` for a given pool.
         */
        points_to_balance: RuntimeDescriptor<[pool_id: number, points: bigint], bigint>;
        /**
         * Returns the equivalent points of `new_funds` for a given pool.
         */
        balance_to_points: RuntimeDescriptor<[pool_id: number, new_funds: bigint], bigint>;
        /**
         * Returns the pending slash for a given pool.
         */
        pool_pending_slash: RuntimeDescriptor<[pool_id: number], bigint>;
        /**
         * Returns the pending slash for a given pool member.
         *
         * If pending slash of the member exceeds `ExistentialDeposit`, it can be reported on
         * chain.
         */
        member_pending_slash: RuntimeDescriptor<[member: SS58String], bigint>;
        /**
         * Returns true if the pool with `pool_id` needs migration.
         *
         * This can happen when the `pallet-nomination-pools` has switched to using strategy
         * [`DelegateStake`](pallet_nomination_pools::adapter::DelegateStake) but the pool
         * still has funds that were staked using the older strategy
         * [TransferStake](pallet_nomination_pools::adapter::TransferStake). Use
         * [`migrate_pool_to_delegate_stake`](pallet_nomination_pools::Call::migrate_pool_to_delegate_stake)
         * to migrate the pool.
         */
        pool_needs_delegate_migration: RuntimeDescriptor<[pool_id: number], boolean>;
        /**
         * Returns true if the delegated funds of the pool `member` needs migration.
         *
         * Once a pool has successfully migrated to the strategy
         * [`DelegateStake`](pallet_nomination_pools::adapter::DelegateStake), the funds of the
         * member can be migrated from pool account to the member's account. Use
         * [`migrate_delegation`](pallet_nomination_pools::Call::migrate_delegation)
         * to migrate the funds of the pool member.
         */
        member_needs_delegate_migration: RuntimeDescriptor<[member: SS58String], boolean>;
        /**
         * Returns the total contribution of a pool member including any balance that is unbonding.
         */
        member_total_balance: RuntimeDescriptor<[who: SS58String], bigint>;
        /**
         * Total balance contributed to the pool.
         */
        pool_balance: RuntimeDescriptor<[pool_id: number], bigint>;
        /**
         * Returns the bonded account and reward account associated with the pool_id.
         */
        pool_accounts: RuntimeDescriptor<[pool_id: number], Anonymize<I2na29tt2afp0j>>;
    };
    /**
    
     */
    StakingApi: {
        /**
         * Returns the nominations quota for a nominator with a given balance.
         */
        nominations_quota: RuntimeDescriptor<[balance: bigint], number>;
        /**
         * Returns the page count of exposures for a validator `account` in a given era.
         */
        eras_stakers_page_count: RuntimeDescriptor<[era: number, account: SS58String], number>;
        /**
         * Returns true if validator `account` has pages to be claimed for the given era.
         */
        pending_rewards: RuntimeDescriptor<[era: number, account: SS58String], boolean>;
    };
};
type IAsset = PlainDescriptor<Anonymize<If9iqq7i64mur8>>;
export type Paseo_asset_hubDispatchError = Anonymize<I7i1mgmuehechs>;
type PalletsTypedef = {
    __storage: IStorage;
    __tx: ICalls;
    __event: IEvent;
    __error: IError;
    __const: IConstants;
    __view: IViewFns;
};
export type Paseo_asset_hub = {
    descriptors: {
        pallets: PalletsTypedef;
        apis: IRuntimeCalls;
    } & Promise<any>;
    metadataTypes: Promise<Uint8Array>;
    asset: IAsset;
    getMetadata: () => Promise<Uint8Array>;
    genesis: string | undefined;
};
declare const _allDescriptors: Paseo_asset_hub;
export default _allDescriptors;
export type Paseo_asset_hubApis = ApisFromDef<IRuntimeCalls>;
export type Paseo_asset_hubQueries = QueryFromPalletsDef<PalletsTypedef>;
export type Paseo_asset_hubCalls = TxFromPalletsDef<PalletsTypedef>;
export type Paseo_asset_hubEvents = EventsFromPalletsDef<PalletsTypedef>;
export type Paseo_asset_hubErrors = ErrorsFromPalletsDef<PalletsTypedef>;
export type Paseo_asset_hubConstants = ConstFromPalletsDef<PalletsTypedef>;
export type Paseo_asset_hubViewFns = ViewFnsFromPalletsDef<PalletsTypedef>;
export type Paseo_asset_hubCallData = Anonymize<Ic7pvaiu1ha8ek> & {
    value: {
        type: string;
    };
};
export type Paseo_asset_hubWhitelistEntry = PalletKey | ApiKey<IRuntimeCalls> | `query.${NestedKey<PalletsTypedef['__storage']>}` | `tx.${NestedKey<PalletsTypedef['__tx']>}` | `event.${NestedKey<PalletsTypedef['__event']>}` | `error.${NestedKey<PalletsTypedef['__error']>}` | `const.${NestedKey<PalletsTypedef['__const']>}` | `view.${NestedKey<PalletsTypedef['__view']>}`;
type PalletKey = `*.${keyof (IStorage & ICalls & IEvent & IError & IConstants & IRuntimeCalls & IViewFns)}`;
type NestedKey<D extends Record<string, Record<string, any>>> = "*" | {
    [P in keyof D & string]: `${P}.*` | {
        [N in keyof D[P] & string]: `${P}.${N}`;
    }[keyof D[P] & string];
}[keyof D & string];
type ApiKey<D extends Record<string, Record<string, any>>> = "api.*" | {
    [P in keyof D & string]: `api.${P}.*` | {
        [N in keyof D[P] & string]: `api.${P}.${N}`;
    }[keyof D[P] & string];
}[keyof D & string];
