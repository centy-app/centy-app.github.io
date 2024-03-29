﻿using MongoDB.Bson.Serialization;
using centy.Domain.Entities.Categories;
using centy.Domain.Entities.Currencies;

namespace centy.Infrastructure.Database;

public static class CentyDbInitializer
{
    public static void RegisterMappings()
    {
        BsonClassMap.RegisterClassMap<ExchangeRates>(classMap =>
        {
            classMap.AutoMap();
            classMap.SetIgnoreExtraElements(true);
            classMap.MapIdField(x => x.BaseCurrency);
        });

        BsonClassMap.RegisterClassMap<Currency>(classMap =>
        {
            classMap.AutoMap();
            classMap.SetIgnoreExtraElements(true);
            classMap.MapIdField(x => x.Code);
        });

        BsonClassMap.RegisterClassMap<Category>(classMap =>
        {
            classMap.AutoMap();
            classMap.SetIgnoreExtraElements(true);
            classMap.MapIdField(x => x.Id);
        });
    }
}
