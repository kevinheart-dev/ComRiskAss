export const pwdMapping = {
    pwd: (src) =>
        Array.isArray(src.disability_statistics)
            ? src.disability_statistics.map((item) => ({
                  type: item.type ?? "",

                  age0_6M: item.age0_6M ?? "",
                  age0_6F: item.age0_6F ?? "",

                  age7m_2yM: item.age7m_2yM ?? "",
                  age7m_2yF: item.age7m_2yF ?? "",

                  age3_5M: item.age3_5M ?? "",
                  age3_5F: item.age3_5F ?? "",

                  age6_12M: item.age6_12M ?? "",
                  age6_12F: item.age6_12F ?? "",
                  age6_12LGBTQ: item.age6_12LGBTQ ?? "",

                  age13_17M: item.age13_17M ?? "",
                  age13_17F: item.age13_17F ?? "",
                  age13_17LGBTQ: item.age13_17LGBTQ ?? "",

                  age18_59M: item.age18_59M ?? "",
                  age18_59F: item.age18_59F ?? "",
                  age18_59LGBTQ: item.age18_59LGBTQ ?? "",

                  age60upM: item.age60upM ?? "",
                  age60upF: item.age60upF ?? "",
                  age60upLGBTQ: item.age60upLGBTQ ?? "",
              }))
            : [],
};
